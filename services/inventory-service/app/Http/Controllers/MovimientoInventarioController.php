<?php

namespace App\Http\Controllers;

use App\Models\LoteInsumo;
use App\Models\MovimientoInventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MovimientoInventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit');

        $query = MovimientoInventario::with('loteInsumo.insumo')->latest();

        if (is_numeric($limit) && $limit > 0) {
            $query->take($limit);
        }

        $movimientos = $query->get();

        return response()->json($movimientos);
    }

    /**
     * Registers an inventory outflow (consumption) using a FEFO (First-Expired, First-Out) strategy,
     * consuming from multiple lots if necessary.
     */
    public function registrarSalida(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|integer|exists:insumos,id',
            'cantidad' => 'required|numeric|min:0.01',
            'motivo' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $datos = $validator->validated();
        $insumoId = $datos['insumo_id'];
        $cantidadAConsumir = $datos['cantidad'];

        try {
            $resultado = DB::transaction(function () use ($insumoId, $cantidadAConsumir, $datos) {

                // 1. Check total available stock first to fail early
                $stockTotal = LoteInsumo::where('insumo_id', $insumoId)->sum('cantidad_restante');
                if ($stockTotal < $cantidadAConsumir) {
                    throw new \Exception('Stock insuficiente para el insumo solicitado.');
                }

                // 2. Get available lots, ordered by expiration date (FEFO). Lots without an expiration date go last.
                $lotesDisponibles = LoteInsumo::where('insumo_id', $insumoId)
                    ->where('cantidad_restante', '>', 0)
                    ->orderByRaw('fecha_vencimiento ASC NULLS LAST')
                    ->lockForUpdate() // Lock rows to prevent race conditions
                    ->get();

                $cantidadPendiente = $cantidadAConsumir;
                $movimientosCreados = [];

                // 3. Iterate through lots and consume stock
                foreach ($lotesDisponibles as $lote) {
                    if ($cantidadPendiente <= 0) {
                        break; // We have fulfilled the request
                    }

                    $cantidadADescontar = min($lote->cantidad_restante, $cantidadPendiente);

                    // 4. Decrement stock from the current lot
                    $lote->decrement('cantidad_restante', $cantidadADescontar);

                    // 5. Record the specific movement for this lot
                    $movimientosCreados[] = MovimientoInventario::create([
                        'lote_insumo_id' => $lote->id,
                        'tipo_movimiento' => 'salida_venta', // Or another type based on request
                        'cantidad' => $cantidadADescontar,
                        'motivo' => $datos['motivo'],
                    ]);

                    $cantidadPendiente -= $cantidadADescontar;
                }

                return $movimientosCreados;
            });

            return response()->json([
                'message' => 'Salida de inventario registrada con éxito.',
                'movimientos' => $resultado
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422); // 422 is more appropriate for validation/logic errors
        }
    }
}
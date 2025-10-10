<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use App\Models\LoteInsumo;
use App\Models\MovimientoInventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MovimientoInventarioController extends Controller
{
    /**
     * Registra una salida de inventario (consumo) siguiendo el método FIFO.
     */
    public function registrarSalida(Request $request)
    {
        // 1. Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|integer|exists:insumos,id',
            'cantidad' => 'required|numeric|min:0.01',
            'motivo' => 'required|string', // Ej: "Producción de donas", "Merma"
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $datos = $validator->validated();
        $insumoId = $datos['insumo_id'];
        $cantidadAConsumir = $datos['cantidad'];

        try {
            // 2. Iniciar una transacción para garantizar la consistencia de los datos
            DB::transaction(function () use ($insumoId, $cantidadAConsumir, $datos) {

                // 3. Buscar el lote más antiguo (FIFO) con stock disponible para ese insumo
                $lote = LoteInsumo::where('insumo_id', $insumoId)
                                ->where('cantidad_restante', '>', 0)
                                ->orderBy('created_at', 'asc') // El más antiguo primero
                                ->lockForUpdate() // Bloquea la fila para evitar que dos procesos la usen a la vez
                                ->first();

                // 4. Verificar si hay stock suficiente en el lote encontrado
                if (!$lote || $lote->cantidad_restante < $cantidadAConsumir) {
                    // Si no hay lote o no hay suficiente stock, cancela la operación
                    throw new \Exception('Stock insuficiente para el insumo solicitado.');
                }

                // 5. Actualizar la cantidad restante del lote
                $lote->cantidad_restante -= $cantidadAConsumir;
                $lote->save();

                // 6. Registrar el movimiento de salida
                MovimientoInventario::create([
                    'lote_insumo_id' => $lote->id,
                    'tipo_movimiento' => 'salida_venta',
                    'cantidad' => $cantidadAConsumir,
                    'motivo' => $datos['motivo'],
                ]);
            });

            return response()->json(['message' => 'Salida de inventario registrada con éxito.'], 200);

        } catch (\Exception $e) {
            // Si algo falla (como el stock insuficiente), devuelve un error
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
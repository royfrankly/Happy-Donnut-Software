<?php

namespace App\Http\Controllers;

use App\Models\LoteInsumo;
use App\Models\MovimientoInventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class MovimientoInventarioController extends Controller
{
    public function registrarEntrada(Request $request)
    {
        // === PROGRAMACIÓN DEFENSIVA: validación de frontera ===
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|integer|exists:insumos,id',
            'cantidad' => 'required|numeric|min:0.01',
            'motivo' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Datos de entrada inválidos.',
                'detalle' => $validator->errors()
            ], 422);
        }

        $datos = $validator->validated();
        $insumoId = $datos['insumo_id'];
        $cantidadAConsumir = $datos['cantidad'];

        try {
            $resultado = DB::transaction(function () use ($insumoId, $cantidadAConsumir, $datos) {
                // Validación temprana de stock total
                $stockTotal = LoteInsumo::where('insumo_id', $insumoId)->sum('cantidad_restante');
                if ($stockTotal < $cantidadAConsumir) {
                    throw new \LogicException('Stock insuficiente para el insumo solicitado.');
                }

                // Obtener lotes disponibles ordenados por vencimiento (FEFO)
                $lotesDisponibles = LoteInsumo::where('insumo_id', $insumoId)
                    ->where('cantidad_restante', '>', 0)
                    ->orderByRaw('fecha_vencimiento ASC NULLS LAST')
                    ->lockForUpdate()
                    ->get();

                $cantidadPendiente = $cantidadAConsumir;
                $movimientosCreados = [];

                foreach ($lotesDisponibles as $lote) {
                    if ($cantidadPendiente <= 0) break;

                    $cantidadADescontar = min($lote->cantidad_restante, $cantidadPendiente);
                    $lote->decrement('cantidad_restante', $cantidadADescontar);

                    $movimientosCreados[] = MovimientoInventario::create([
                        'lote_insumo_id' => $lote->id,
                        'tipo_movimiento' => 'salida_venta',
                        'cantidad' => $cantidadADescontar,
                        'motivo' => $datos['motivo'],
                    ]);

                    $cantidadPendiente -= $cantidadADescontar;
                }

                // === ASERCIÓN: validar supuesto lógico interno ===
                // En este punto, toda la cantidad debe haberse consumido (gracias a la validación previa)
                assert($cantidadPendiente == 0, 'Error lógico: no se consumió toda la cantidad solicitada.');

                return $movimientosCreados;
            });

            return response()->json([
                'message' => 'Salida de inventario registrada con éxito.',
                'movimientos' => $resultado
            ], 200);

        } catch (\LogicException $e) {
            // Error de lógica de negocio (ej. stock insuficiente)
            return response()->json([
                'error' => 'No se puede procesar la solicitud.',
                'detalle' => $e->getMessage()
            ], 422);

        } catch (QueryException $e) {
            // Error específico de base de datos (ej. conexión perdida, restricción violada)
            \Log::error('Error en BD al registrar salida: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error temporal en el sistema. Intente más tarde.'
            ], 500);

        } catch (\Exception $e) {
            // Fallback para errores imprevistos (aunque en teoría no deberían ocurrir)
            \Log::error('Error inesperado: ' . $e->getMessage());
            return response()->json([
                'error' => 'Ocurrió un error inesperado.'
            ], 500);
        }
    }

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
}
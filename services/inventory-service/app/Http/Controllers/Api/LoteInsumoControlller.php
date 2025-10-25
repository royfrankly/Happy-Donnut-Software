<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoteInsumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // <-- Importante para la transacción
use Illuminate\Support\Facades\Validator;

class LoteInsumoController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|exists:insumos,id',
            'cantidad_inicial' => 'required|numeric|min:0.01',
            'fecha_vencimiento' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $datos = $validator->validated();

        // 2. Usar una transacción para asegurar la integridad de los datos
        try {
            $loteCreado = DB::transaction(function () use ($datos) {

                // 3. Crear el Lote del Insumo
                $nuevoLote = LoteInsumo::create([
                    'insumo_id' => $datos['insumo_id'],
                    'cantidad_inicial' => $datos['cantidad_inicial'],
                    'cantidad_restante' => $datos['cantidad_inicial'],
                    'fecha_vencimiento' => $datos['fecha_vencimiento'] ?? null,
                ]);

                // 4. Crear el Movimiento de Inventario asociado
                $nuevoLote->movimientos()->create([
                    'tipo_movimiento' => 'entrada',
                    'cantidad' => $datos['cantidad_inicial'],
                    'motivo' => 'Compra de inventario',
                ]);

                return $nuevoLote;
            });

            return response()->json($loteCreado, 201); // 201 Created

        } catch (\Exception $e) {
            // Si algo falla, se revierte todo y se devuelve un error 500
            return response()->json(['error' => 'No se pudo registrar el lote.', 'message' => $e->getMessage()], 500);
        }
    }
}
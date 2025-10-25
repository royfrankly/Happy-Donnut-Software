<?php

namespace App\Http\Controllers;

use App\Models\LoteInsumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LoteInsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lotes = LoteInsumo::with('insumo')->latest()->get();
        return response()->json($lotes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|exists:insumos,id',
            'cantidad_inicial' => 'required|numeric|min:0.01',
            'fecha_vencimiento' => 'nullable|date',
            'precio_compra_unitario' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $datos = $validator->validated();

        try {
            $loteCreado = DB::transaction(function () use ($datos) {

                $nuevoLote = LoteInsumo::create([
                    'insumo_id' => $datos['insumo_id'],
                    'cantidad_inicial' => $datos['cantidad_inicial'],
                    'cantidad_restante' => $datos['cantidad_inicial'],
                    'fecha_vencimiento' => $datos['fecha_vencimiento'] ?? null,
                    'precio_compra_unitario' => $datos['precio_compra_unitario'],
                    'descripcion' => $datos['descripcion'] ?? null,
                ]);

                // This uses the relationship defined in the model, which is cleaner
                $nuevoLote->movimientos()->create([
                    'tipo_movimiento' => 'entrada',
                    'cantidad' => $datos['cantidad_inicial'],
                    'motivo' => 'Compra de inventario',
                ]);

                return $nuevoLote;
            });

            return response()->json($loteCreado, 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo registrar el lote.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LoteInsumo $loteInsumo)
    {
        return response()->json($loteInsumo->load('insumo'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoteInsumo $loteInsumo)
    {
        $validator = Validator::make($request->all(), [
            'fecha_vencimiento' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Only update the expiration date
        $loteInsumo->update($validator->validated());

        return response()->json($loteInsumo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoteInsumo $loteInsumo)
    {
        // Safety check: only allow deleting a lot if no part of it has been used.
        if ($loteInsumo->cantidad_restante < $loteInsumo->cantidad_inicial) {
            return response()->json(['error' => 'No se puede eliminar un lote que ya ha sido utilizado.'], 422);
        }

        $loteInsumo->delete();

        return response()->json(null, 204);
    }
}

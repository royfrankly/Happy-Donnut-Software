<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InsumoController extends Controller
{
    /**
     * Display a listing of the resource with their total stock.
     */
    public function index()
    {
        // Eager load the sum of 'cantidad_restante' from the 'lotes' relationship
        $insumos = Insumo::withSum('lotes', 'cantidad_restante')->get();
        return response()->json($insumos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|unique:insumos|max:255',
            'descripcion' => 'nullable|string',
            'unidad_medida' => 'required|string|max:50',
            'stock_minimo_alerta' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $insumo = Insumo::create($validator->validated());

        return response()->json($insumo, 201);
    }

    /**
     * Display the specified resource with its total stock.
     */
    public function show(Insumo $insumo)
    {
        // Load the sum of stock for the specific insumo
        $insumo->loadSum('lotes', 'cantidad_restante');
        return response()->json($insumo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Insumo $insumo)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|required|string|max:255|unique:insumos,nombre,' . $insumo->id,
            'descripcion' => 'nullable|string',
            'unidad_medida' => 'sometimes|required|string|max:50',
            'stock_minimo_alerta' => 'sometimes|required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $insumo->update($validator->validated());

        return response()->json($insumo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Insumo $insumo)
    {
        $insumo->delete();
        return response()->json(null, 204);
    }

    /**
     * Check for insumos with low stock.
     */
    public function consultarAlertasDeStock()
    {
        // Get all insumos with their total stock in one query
        $insumos = Insumo::withSum('lotes', 'cantidad_restante')->get();

        // Filter the collection in PHP, which is much faster
        $alertas = $insumos->filter(function ($insumo) {
            // The sum is available as 'lotes_sum_cantidad_restante'
            return $insumo->lotes_sum_cantidad_restante <= $insumo->stock_minimo_alerta;
        })->map(function ($insumo) {
            // Format the output as desired
            return [
                'insumo_id' => $insumo->id,
                'nombre' => $insumo->nombre,
                'stock_actual' => $insumo->lotes_sum_cantidad_restante ?? 0,
                'stock_minimo_alerta' => $insumo->stock_minimo_alerta,
            ];
        });

        if ($alertas->isEmpty()) {
            return response()->json(['message' => 'No hay alertas de stock.'], 200);
        }

        // Return the values of the collection to get a simple array
        return response()->json($alertas->values());
    }
}

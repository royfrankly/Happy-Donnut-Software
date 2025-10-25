<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::with('categoria')->get();
        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required|exists:categorias,id',
            'nombre_producto' => 'required|string|max:255|unique:productos,nombre_producto',
            'descripcion' => 'nullable|string',
            'precio_base' => 'required|numeric|min:0',
            'tipo' => 'required|in:preparado,reventa',
            'stock' => 'nullable|integer|min:0|required_if:tipo,reventa',
            'receta' => 'nullable|array|required_if:tipo,preparado',
            'receta.*.insumo_id' => 'required_with:receta|exists:insumos,id',
            'receta.*.cantidad' => 'required_with:receta|numeric|min:0.01',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();

        try {
            $producto = DB::transaction(function () use ($validatedData) {
                $producto = Producto::create($validatedData);

                if ($producto->tipo === 'preparado' && !empty($validatedData['receta'])) {
                    $recetaData = [];
                    foreach ($validatedData['receta'] as $ingrediente) {
                        $recetaData[$ingrediente['insumo_id']] = ['cantidad' => $ingrediente['cantidad']];
                    }
                    $producto->insumos()->sync($recetaData);
                }

                return $producto;
            });

            return response()->json($producto->load('insumos'), 201);

        } catch (\Throwable $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            return response()->json(['message' => 'Error interno al crear el producto.'], 500);
        }
    }

    public function show(Producto $producto)
    {
        // Eager load relationships for detailed view
        return response()->json($producto->load('categoria', 'insumos'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'sometimes|required|exists:categorias,id',
            'nombre_producto' => 'sometimes|required|string|max:255|unique:productos,nombre_producto,' . $producto->id,
            'descripcion' => 'nullable|string',
            'precio_base' => 'sometimes|required|numeric|min:0',
            'tipo' => 'sometimes|required|in:preparado,reventa',
            'stock' => 'nullable|integer|min:0|required_if:tipo,reventa',
            'receta' => 'nullable|array|required_if:tipo,preparado',
            'receta.*.insumo_id' => 'required_with:receta|exists:insumos,id',
            'receta.*.cantidad' => 'required_with:receta|numeric|min:0.01',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $validatedData = $validator->validated();

        try {
            $producto = DB::transaction(function () use ($validatedData, $producto) {
                $producto->update($validatedData);

                if ($producto->tipo === 'preparado') {
                    $recetaData = [];
                    if (!empty($validatedData['receta'])) {
                        foreach ($validatedData['receta'] as $ingrediente) {
                            $recetaData[$ingrediente['insumo_id']] = ['cantidad' => $ingrediente['cantidad']];
                        }
                    }
                    // Syncing with an empty array will remove all ingredients, which is the desired behavior
                    $producto->insumos()->sync($recetaData);
                }

                return $producto;
            });

            return response()->json($producto->load('insumos', 'categoria'));

        } catch (\Throwable $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['message' => 'Error interno al actualizar el producto.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(null, 204);
    }

}
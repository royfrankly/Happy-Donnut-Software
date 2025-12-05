<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Insumo;

class ProductoController extends Controller
{
    /**
     * Listar todas las recetas (productos terminados)
     */
    public function index(Request $request)
    {
        $query = Producto::with('insumos');
        
        if ($request->has('tipo_producto')) {
            $query->where('tipo_producto', $request->tipo_producto);
        }
        
        $productos = $query->orderBy('nombre_producto')->get();
        
        return response()->json($productos);
    }

    /**
     * Crear nueva receta/producto
     */
    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|integer',
            'nombre_producto' => 'required|string|max:255',
            'tipo_producto' => 'required|in:donut,cafe,otro',
            'insumos' => 'required|array|min:1',
            'insumos.*.insumo_id' => 'required|integer|exists:insumos,insumo_id',
            'insumos.*.cantidad_necesaria' => 'required|integer|min:1'
        ]);

        $producto = Producto::create([
            'producto_id' => $request->producto_id,
            'nombre_producto' => $request->nombre_producto,
            'tipo_producto' => $request->tipo_producto
        ]);

        // Asociar insumos con sus cantidades
        foreach ($request->insumos as $insumo) {
            $producto->insumos()->attach($insumo['insumo_id'], [
                'cantidad_necesaria' => $insumo['cantidad_necesaria']
            ]);
        }

        return response()->json([
            'message' => 'Receta creada exitosamente',
            'producto' => $producto->load('insumos')
        ], 201);
    }

    /**
     * Mostrar receta específica
     */
    public function show($id)
    {
        $producto = Producto::with('insumos')->find($id);
        
        if (!$producto) {
            return response()->json(['error' => 'Receta no encontrada'], 404);
        }

        return response()->json($producto);
    }

    /**
     * Actualizar receta
     */
    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);
        
        if (!$producto) {
            return response()->json(['error' => 'Receta no encontrada'], 404);
        }

        $request->validate([
            'nombre_producto' => 'sometimes|string|max:255',
            'tipo_producto' => 'sometimes|in:donut,cafe,otro',
            'insumos' => 'sometimes|array|min:1',
            'insumos.*.insumo_id' => 'required|integer|exists:insumos,insumo_id',
            'insumos.*.cantidad_necesaria' => 'required|integer|min:1'
        ]);

        $producto->update($request->all());

        // Actualizar insumos si se proporcionan
        if ($request->has('insumos')) {
            $producto->insumos()->sync([]);
            
            foreach ($request->insumos as $insumo) {
                $producto->insumos()->attach($insumo['insumo_id'], [
                    'cantidad_necesaria' => $insumo['cantidad_necesaria']
                ]);
            }
        }

        return response()->json([
            'message' => 'Receta actualizada exitosamente',
            'producto' => $producto->load('insumos')
        ]);
    }

    /**
     * Eliminar receta
     */
    public function destroy($id)
    {
        $producto = Producto::find($id);
        
        if (!$producto) {
            return response()->json(['error' => 'Receta no encontrada'], 404);
        }

        // Eliminar relaciones con insumos
        $producto->insumos()->detach();
        $producto->delete();

        return response()->json(['message' => 'Receta eliminada exitosamente']);
    }
}

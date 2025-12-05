<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promocion;

class PromocionController extends Controller
{
    /**
     * Listar todas las promociones
     */
    public function index()
    {
        $promotions = Promocion::with('productos')->orderBy('created_at', 'desc')->get();
        
        return response()->json($promotions);
    }

    /**
     * Crear nueva promoción
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_promocion' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'tipo_descuento' => 'required|in:porcentaje,fijo',
            'valor_descuento' => 'required|numeric|min:0',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'activo' => 'boolean',
            'productos' => 'array',
            'productos.*.producto_id' => 'required|integer|exists:productos,producto_id',
            'productos.*.cantidad_producto' => 'required|integer|min:1'
        ]);

        $promotion = Promocion::create([
            'nombre_promocion' => $request->nombre_promocion,
            'descripcion' => $request->descripcion,
            'tipo_descuento' => $request->tipo_descuento,
            'valor_descuento' => $request->valor_descuento,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'activo' => $request->activo ?? true
        ]);

        // Asociar productos
        if ($request->has('productos')) {
            $promotion->productos()->attach($request->productos);
        }

        return response()->json([
            'message' => 'Promoción creada exitosamente',
            'promotion' => $promotion->load('productos')
        ], 201);
    }

    /**
     * Mostrar promoción específica
     */
    public function show($id)
    {
        $promotion = Promocion::with('productos')->find($id);
        
        if (!$promotion) {
            return response()->json(['error' => 'Promoción no encontrada'], 404);
        }

        return response()->json($promotion);
    }

    /**
     * Actualizar promoción
     */
    public function update(Request $request, $id)
    {
        $promotion = Promocion::find($id);
        
        if (!$promotion) {
            return response()->json(['error' => 'Promoción no encontrada'], 404);
        }

        $request->validate([
            'nombre_promocion' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'tipo_descuento' => 'sometimes|in:porcentaje,fijo',
            'valor_descuento' => 'sometimes|numeric|min:0',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date|after:fecha_inicio',
            'activo' => 'boolean'
        ]);

        $promotion->update($request->all());

        // Actualizar productos asociados si se proporcionan
        if ($request->has('productos')) {
            $promotion->productos()->sync($request->productos);
        }

        return response()->json([
            'message' => 'Promoción actualizada exitosamente',
            'promotion' => $promotion->load('productos')
        ]);
    }

    /**
     * Eliminar promoción
     */
    public function destroy($id)
    {
        $promotion = Promocion::find($id);
        
        if (!$promotion) {
            return response()->json(['error' => 'Promoción no encontrada'], 404);
        }

        $promotion->productos()->detach();
        $promotion->delete();

        return response()->json(['message' => 'Promoción eliminada exitosamente']);
    }

    /**
     * Obtener promociones activas
     */
    public function getActive()
    {
        $promotions = Promocion::with('productos')
                              ->where('activo', true)
                              ->where('fecha_inicio', '<=', now())
                              ->where('fecha_fin', '>=', now())
                              ->orderBy('created_at', 'desc')
                              ->get();

        return response()->json($promotions);
    }
}

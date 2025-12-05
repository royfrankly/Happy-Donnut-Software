<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Insumo;
use App\Models\LoteInsumo;

class InsumoController extends Controller
{
    /**
     * Listar todos los insumos
     */
    public function index(Request $request)
    {
        $query = Insumo::with('lotes');
        
        if ($request->has('activo')) {
            $query->where('activo', $request->activo);
        }
        
        $insumos = $query->orderBy('nombre_insumo')->get();
        
        return response()->json($insumos);
    }

    /**
     * Crear nuevo insumo
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_insumo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'unidad_medida' => 'required|string|max:50',
            'stock_minimo' => 'required|integer|min:0',
            'activo' => 'boolean'
        ]);

        $insumo = Insumo::create([
            'nombre_insumo' => $request->nombre_insumo,
            'descripcion' => $request->descripcion,
            'unidad_medida' => $request->unidad_medida,
            'stock_minimo' => $request->stock_minimo,
            'activo' => $request->activo ?? true
        ]);

        return response()->json([
            'message' => 'Insumo creado exitosamente',
            'insumo' => $insumo
        ], 201);
    }

    /**
     * Mostrar insumo específico
     */
    public function show($id)
    {
        $insumo = Insumo::with('lotes')->find($id);
        
        if (!$insumo) {
            return response()->json(['error' => 'Insumo no encontrado'], 404);
        }

        return response()->json($insumo);
    }

    /**
     * Actualizar insumo
     */
    public function update(Request $request, $id)
    {
        $insumo = Insumo::find($id);
        
        if (!$insumo) {
            return response()->json(['error' => 'Insumo no encontrado'], 404);
        }

        $request->validate([
            'nombre_insumo' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'unidad_medida' => 'sometimes|string|max:50',
            'stock_minimo' => 'sometimes|integer|min:0',
            'activo' => 'boolean'
        ]);

        $insumo->update($request->all());

        return response()->json([
            'message' => 'Insumo actualizado exitosamente',
            'insumo' => $insumo->load('lotes')
        ]);
    }

    /**
     * Eliminar insumo
     */
    public function destroy($id)
    {
        $insumo = Insumo::find($id);
        
        if (!$insumo) {
            return response()->json(['error' => 'Insumo no encontrado'], 404);
        }

        // Verificar si tiene lotes asociados
        if ($insumo->lotes()->count() > 0) {
            return response()->json(['error' => 'No se puede eliminar el insumo porque tiene lotes asociados'], 400);
        }

        $insumo->delete();

        return response()->json(['message' => 'Insumo eliminado exitosamente']);
    }

    /**
     * Obtener lotes de insumos
     */
    public function getLotes(Request $request)
    {
        $query = LoteInsumo::with('insumo');
        
        if ($request->has('insumo_id')) {
            $query->where('insumo_id', $request->insumo_id);
        }
        
        if ($request->has('proximos_a_vencer')) {
            $query->where('fecha_vencimiento', '<=', now()->addDays(30))
                  ->where('cantidad_actual', '>', 0);
        }
        
        $lotes = $query->orderBy('fecha_vencimiento')->get();
        
        return response()->json($lotes);
    }

    /**
     * Crear nuevo lote de insumo
     */
    public function createLote(Request $request)
    {
        $request->validate([
            'insumo_id' => 'required|integer|exists:insumos,insumo_id',
            'cantidad_inicial' => 'required|integer|min:1',
            'fecha_vencimiento' => 'required|date|after:today'
        ]);

        $lote = LoteInsumo::create([
            'insumo_id' => $request->insumo_id,
            'cantidad_inicial' => $request->cantidad_inicial,
            'cantidad_actual' => $request->cantidad_inicial,
            'fecha_vencimiento' => $request->fecha_vencimiento
        ]);

        return response()->json([
            'message' => 'Lote creado exitosamente',
            'lote' => $lote->load('insumo')
        ], 201);
    }

    /**
     * Actualizar lote
     */
    public function updateLote(Request $request, $id)
    {
        $lote = LoteInsumo::find($id);
        
        if (!$lote) {
            return response()->json(['error' => 'Lote no encontrado'], 404);
        }

        $request->validate([
            'cantidad_actual' => 'sometimes|integer|min:0',
            'fecha_vencimiento' => 'sometimes|date|after:today'
        ]);

        $lote->update($request->all());

        return response()->json([
            'message' => 'Lote actualizado exitosamente',
            'lote' => $lote->load('insumo')
        ]);
    }
}

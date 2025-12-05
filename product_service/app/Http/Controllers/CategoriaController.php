<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    /**
     * Listar todas las categorías
     */
    public function index()
    {
        $categories = Categoria::orderBy('nombre_categoria')->get();
        
        return response()->json($categories);
    }

    /**
     * Crear nueva categoría
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre_categoria' => 'required|string|max:255|unique:categorias,nombre_categoria',
            'descripcion' => 'nullable|string'
        ]);

        $category = Categoria::create([
            'nombre_categoria' => $request->nombre_categoria,
            'descripcion' => $request->descripcion
        ]);

        return response()->json([
            'message' => 'Categoría creada exitosamente',
            'category' => $category
        ], 201);
    }

    /**
     * Mostrar categoría específica
     */
    public function show($id)
    {
        $category = Categoria::with('productos')->find($id);
        
        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        return response()->json($category);
    }

    /**
     * Actualizar categoría
     */
    public function update(Request $request, $id)
    {
        $category = Categoria::find($id);
        
        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        $request->validate([
            'nombre_categoria' => 'sometimes|string|max:255|unique:categorias,nombre_categoria,' . $id . ',categoria_id',
            'descripcion' => 'nullable|string'
        ]);

        $category->update($request->all());

        return response()->json([
            'message' => 'Categoría actualizada exitosamente',
            'category' => $category
        ]);
    }

    /**
     * Eliminar categoría
     */
    public function destroy($id)
    {
        $category = Categoria::find($id);
        
        if (!$category) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        // Verificar si hay productos asociados
        if ($category->productos()->count() > 0) {
            return response()->json(['error' => 'No se puede eliminar la categoría porque tiene productos asociados'], 400);
        }

        $category->delete();

        return response()->json(['message' => 'Categoría eliminada exitosamente']);
    }
}

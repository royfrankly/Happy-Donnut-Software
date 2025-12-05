<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Categoria;

class ProductController extends Controller
{
    /**
     * Listar todos los productos
     */
    public function index(Request $request)
    {
        $query = Producto::with('categoria', 'promociones');
        
        // Filtros
        if ($request->has('category_id')) {
            $query->where('categoria_id', $request->category_id);
        }
        
        if ($request->has('tipo_producto')) {
            $query->where('tipo_producto', $request->tipo_producto);
        }
        
        if ($request->has('activo')) {
            $query->where('activo_web', $request->activo);
        }
        
        $products = $query->orderBy('nombre_producto')->paginate(10);
        
        return response()->json($products);
    }

    /**
     * Crear nuevo producto
     */
    public function store(Request $request)
    {
        $request->validate([
            'categoria_id' => 'required|integer|exists:categorias,categoria_id',
            'nombre_producto' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio_base' => 'required|numeric|min:0',
            'tipo_producto' => 'required|in:donut,cafe,otro',
            'activo_web' => 'boolean'
        ]);

        $product = Producto::create([
            'categoria_id' => $request->categoria_id,
            'nombre_producto' => $request->nombre_producto,
            'descripcion' => $request->descripcion,
            'precio_base' => $request->precio_base,
            'tipo_producto' => $request->tipo_producto,
            'activo_web' => $request->activo_web ?? true
        ]);

        return response()->json([
            'message' => 'Producto creado exitosamente',
            'product' => $product->load('categoria')
        ], 201);
    }

    /**
     * Mostrar producto específico
     */
    public function show($id)
    {
        $product = Producto::with('categoria', 'promociones')->find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        return response()->json($product);
    }

    /**
     * Actualizar producto
     */
    public function update(Request $request, $id)
    {
        $product = Producto::find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'categoria_id' => 'sometimes|integer|exists:categorias,categoria_id',
            'nombre_producto' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'precio_base' => 'sometimes|numeric|min:0',
            'tipo_producto' => 'sometimes|in:donut,cafe,otro',
            'activo_web' => 'boolean'
        ]);

        $product->update($request->all());

        return response()->json([
            'message' => 'Producto actualizado exitosamente',
            'product' => $product->load('categoria')
        ]);
    }

    /**
     * Eliminar producto
     */
    public function destroy($id)
    {
        $product = Producto::find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Producto eliminado exitosamente']);
    }

    /**
     * Actualizar estado del producto
     */
    public function updateStatus(Request $request, $id)
    {
        $product = Producto::find($id);
        
        if (!$product) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'activo_web' => 'required|boolean'
        ]);

        $product->update(['activo_web' => $request->activo_web]);

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'product' => $product
        ]);
    }

    /**
     * Obtener productos disponibles para clientes
     */
    public function getAvailable(Request $request)
    {
        $query = Producto::with('categoria')
                        ->where('activo_web', true);
        
        // Filtros opcionales
        if ($request->has('category_id')) {
            $query->where('categoria_id', $request->category_id);
        }
        
        if ($request->has('tipo_producto')) {
            $query->where('tipo_producto', $request->tipo_producto);
        }
        
        $products = $query->orderBy('nombre_producto')->get();
        
        return response()->json($products);
    }

    /**
     * Buscar productos
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2'
        ]);

        $products = Producto::with('categoria')
                            ->where('activo_web', true)
                            ->where(function($query) use ($request) {
                                $query->where('nombre_producto', 'like', '%' . $request->q . '%')
                                      ->orWhere('descripcion', 'like', '%' . $request->q . '%');
                            })
                            ->orderBy('nombre_producto')
                            ->limit(20)
                            ->get();

        return response()->json($products);
    }
}

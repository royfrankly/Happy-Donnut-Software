<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\Pago;
use App\Models\MetodoPago;

class VentaController extends Controller
{
    /**
     * Listar todas las ventas (para admin)
     */
    public function index(Request $request)
    {
        $ventas = Venta::with(['cliente', 'detalles', 'pagos'])
                      ->orderBy('created_at', 'desc')
                      ->paginate(10);
        
        return response()->json($ventas);
    }

    /**
     * Crear nueva venta (para admin/empleados)
     */
    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|integer',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'payment_method' => 'required|string'
        ]);

        $total = collect($request->items)->sum(function($item) {
            return $item['price'] * $item['quantity'];
        });

        $venta = Venta::create([
            'cliente_id' => $request->cliente_id,
            'empleado_id' => $request->user()->id ?? 1,
            'total_venta' => $total,
            'estado_pedido' => 'pendiente',
            'fecha_venta' => now()
        ]);

        foreach ($request->items as $item) {
            DetalleVenta::create([
                'venta_id' => $venta->venta_id,
                'producto_id' => $item['product_id'],
                'nombre_producto' => $item['name'] ?? 'Producto',
                'precio_unitario_venta' => $item['price'],
                'cantidad' => $item['quantity']
            ]);
        }

        return response()->json([
            'message' => 'Venta creada exitosamente',
            'venta' => $venta->load('detalles')
        ], 201);
    }

    /**
     * Mostrar venta específica
     */
    public function show($id)
    {
        $venta = Venta::with(['cliente', 'detalles', 'pagos'])
                     ->find($id);

        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        return response()->json($venta);
    }

    /**
     * Actualizar estado de venta
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'estado_pedido' => 'required|in:pendiente,en_proceso,completado,cancelado'
        ]);

        $venta = Venta::find($id);

        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        $venta->update(['estado_pedido' => $request->estado_pedido]);

        return response()->json([
            'message' => 'Estado actualizado exitosamente',
            'venta' => $venta
        ]);
    }

    /**
     * Obtener detalles de una venta
     */
    public function getDetalles($id)
    {
        $venta = Venta::find($id);

        if (!$venta) {
            return response()->json(['error' => 'Venta no encontrada'], 404);
        }

        $detalles = DetalleVenta::where('venta_id', $id)->get();

        return response()->json($detalles);
    }
}

<?php

// app/Models/DetalleVenta.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    protected $primaryKey = 'detalle_id';
    protected $fillable = [
        'venta_id', 'producto_id', 'nombre_producto',
        'precio_unitario_venta', 'cantidad'
    ];

    public function venta()
    {
        return $this->belongsTo(Venta::class, 'venta_id');
    }
}
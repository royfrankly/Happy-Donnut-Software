<?php

// app/Models/Venta.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $primaryKey = 'venta_id';
    protected $fillable = ['cliente_id', 'empleado_id', 'total_venta', 'estado_pedido', 'fecha_venta'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleVenta::class, 'venta_id');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'venta_id');
    }
}
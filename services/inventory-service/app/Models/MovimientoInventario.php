<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoInventario extends Model
{
    use HasFactory;

    protected $table = 'movimientos_inventario'; // <-- ¡ESTA ES LA LÍNEA QUE LO ARREGLA TODO!

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lote_insumo_id',
        'tipo_movimiento',
        'cantidad',
        'motivo',
    ];
}
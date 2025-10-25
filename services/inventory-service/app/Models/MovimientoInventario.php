<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoInventario extends Model
{
    use HasFactory;

    protected $table = 'movimientos_inventarios';

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

    /**
     * Get the lot associated with the inventory movement.
     */
    public function loteInsumo()
    {
        return $this->belongsTo(LoteInsumo::class, 'lote_insumo_id');
    }
}
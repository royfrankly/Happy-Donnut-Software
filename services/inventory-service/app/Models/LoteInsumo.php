<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoteInsumo extends Model
{
    use HasFactory;

    protected $table = 'lotes_insumos'; // <-- AÑADIR ESTO

    protected $fillable = [
        'insumo_id',
        'cantidad_inicial',
        'cantidad_restante',
        'fecha_vencimiento',
        'precio_compra_unitario',
        'descripcion',
    ];

    public function movimientos()
    {
        return $this->hasMany(MovimientoInventario::class, 'lote_insumo_id');
    }

    /**
     * Get the supply type associated with this lot.
     */
    public function insumo()
    {
        return $this->belongsTo(Insumo::class, 'insumo_id');
    }
}
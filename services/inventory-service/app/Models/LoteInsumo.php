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
    ];

    public function movimientos()
    {
        return $this->hasMany(MovimientoInventario::class, 'lote_insumo_id');
    }
}
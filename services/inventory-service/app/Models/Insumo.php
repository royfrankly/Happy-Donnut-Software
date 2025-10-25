<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // <-- AÑADIDO

class Insumo extends Model
{
    use HasFactory, SoftDeletes; // <-- AÑADIDO

    protected $fillable = [
        'nombre',
        'unidad_medida',
        'stock_minimo_alerta',
    ];

    public function lotes()
    {
        return $this->hasMany(LoteInsumo::class, 'insumo_id');
    }
}

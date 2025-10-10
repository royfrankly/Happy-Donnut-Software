<?php

// app/Models/Insumo.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    protected $primaryKey = 'insumo_id';
    protected $fillable = [
        'nombre_insumo',
        'unidad_medida_base',
        'stock_minimo_alerta',
        'stock_total_calculado',
    ];

    public function lotes()
    {
        return $this->hasMany(LoteInsumo::class, 'insumo_id');
    }
}
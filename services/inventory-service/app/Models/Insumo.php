<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    use HasFactory;

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

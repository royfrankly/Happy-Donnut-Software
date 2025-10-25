<?php

// app/Models/LoteInsumo.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoteInsumo extends Model
{
    protected $primaryKey = 'lote_id';
    protected $fillable = [
        'insumo_id', 'cantidad_comprada', 'cantidad_restante',
        'costo_total_compra', 'fecha_compra', 'fecha_caducidad',
    ];

    public function insumo()
    {
        return $this->belongsTo(Insumo::class, 'insumo_id');
    }
}
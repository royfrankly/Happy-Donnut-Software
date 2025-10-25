<?php

// app/Models/AjusteInventario.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AjusteInventario extends Model
{
    protected $primaryKey = 'ajuste_id';
    protected $fillable = ['lote_id', 'empleado_id', 'cantidad', 'motivo'];

    public function loteInsumo()
    {
        return $this->belongsTo(LoteInsumo::class, 'lote_id');
    }
}
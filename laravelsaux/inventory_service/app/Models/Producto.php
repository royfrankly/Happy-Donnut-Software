<?php

// app/Models/Producto.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $primaryKey = 'producto_id';
    public $incrementing = false; // Clave para llaves primarias no autoincrementales

    protected $fillable = ['producto_id', 'nombre_producto', 'tipo_producto'];

    // Define la relación muchos a muchos con Insumo a través de la tabla 'recetas'
    public function insumos()
    {
        return $this->belongsToMany(Insumo::class, 'recetas', 'producto_id', 'insumo_id')
                    ->withPivot('cantidad_necesaria');
    }
}
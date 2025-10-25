<?php

// app/Models/Producto.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $primaryKey = 'producto_id';
    protected $fillable = [
        'categoria_id', 'nombre_producto', 'descripcion', 
        'precio_base', 'tipo_producto', 'activo_web'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    // Define la relación muchos a muchos con Promocion
    public function promociones()
    {
        return $this->belongsToMany(Promocion::class, 'promociones_detalles', 'producto_id', 'promocion_id')
                    ->withPivot('cantidad_producto');
    }
}
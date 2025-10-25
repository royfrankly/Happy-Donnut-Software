<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'categoria_id',
        'nombre_producto',
        'descripcion',
        'precio_base',
        'tipo',
        'stock',
    ];

    /**
     * Get the category that owns the product.
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * The insumos that belong to the product (recipe).
     */
    public function insumos()
    {
        return $this->belongsToMany(Insumo::class, 'producto_insumo')->withPivot('cantidad');
    }
}

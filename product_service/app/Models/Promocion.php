<?php
// app/Models/Promocion.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promocion extends Model
{
    protected $primaryKey = 'promocion_id';
    protected $fillable = [
        'nombre_promocion', 'descripcion', 'precio_fijo_combo', 
        'fecha_inicio', 'fecha_fin'
    ];

    // Define la relación muchos a muchos con Producto
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'promociones_detalles', 'promocion_id', 'producto_id')
                    ->withPivot('cantidad_producto');
    }
}
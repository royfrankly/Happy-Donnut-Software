<?php

// app/Models/Cliente.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $primaryKey = 'cliente_id';
    protected $fillable = ['nombre', 'apellido', 'telefono', 'email'];

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'cliente_id');
    }
}
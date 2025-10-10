<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model {
    protected $primaryKey = 'metodo_pago_id';
    protected $fillable = ['nombre_metodo'];
    public $timestamps = false;
}

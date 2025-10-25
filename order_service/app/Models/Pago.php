<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model {
    protected $primaryKey = 'pago_id';
    protected $fillable = ['venta_id', 'metodo_pago_id', 'monto'];

    public function venta() {
        return $this->belongsTo(Venta::class, 'venta_id');
    }
    public function metodoPago() {
        return $this->belongsTo(MetodoPago::class, 'metodo_pago_id');
    }
}
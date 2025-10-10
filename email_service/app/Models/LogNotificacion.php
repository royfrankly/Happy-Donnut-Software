<?php

// app/Models/LogNotificacion.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogNotificacion extends Model
{
    protected $table = 'log_notificaciones';
    protected $primaryKey = 'log_id';

    // No usamos 'created_at' y 'updated_at' de Laravel, solo nuestro campo 'fecha_envio'
    public $timestamps = false; 

    protected $fillable = [
        'destinatario',
        'asunto',
        'tipo_notificacion',
        'estado',
        'mensaje_error',
        'fecha_envio',
    ];
}
<?php

// app/Models/Empleado.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// Si quieres usar el sistema de autenticación de Laravel, heredarías de Authenticatable
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Para la gestión de tokens de API

class Empleado extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'empleados';
    protected $primaryKey = 'empleado_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'telefono',
        'rol',
        'password',
        'estado',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * MUY IMPORTANTE para la seguridad.
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'estado' => 'boolean',
    ];

    /**
     * Sobrescribe el nombre del campo de la contraseña para el sistema de Auth de Laravel.
     */
    public function getAuthPassword()
    {
        return $this->password;
    }
}
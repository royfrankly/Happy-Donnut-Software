<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrativo extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'administrativos';
    protected $primaryKey = 'administrativo_id';

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'telefono',
        'rol',
        'password',
        'estado',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public function getAuthPassword()
    {
        return $this->password;
    }
}

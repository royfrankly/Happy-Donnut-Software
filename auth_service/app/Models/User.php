<?php

// app/Models/User.php en tu auth-service

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuarios';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'usuario_id';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',  // Cambiado de 'name' a 'username'
        'password',
        'role',
        'estado',
        'persona_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estado' => 'boolean',
        'password' => 'hashed',
    ];

    /**
     * Get the username field for authentication.
     * Laravel uses this for password reset and other features.
     */
    public function getEmailForPasswordReset()
    {
        return $this->username;
    }

    /**
     * Get the email address for notifications.
     */
    public function routeNotificationForMail($notification = null)
    {
        return $this->username; // Usamos username como si fuera email
    }

    public function comments()
    {
        return $this->hasMany(\App\Models\Comment::class);
    }
}
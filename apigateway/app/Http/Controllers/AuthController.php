<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * AuthController se utiliza INTERNAMENTE por el GatewayController 
 * para manejar la sincronización de usuarios y la gestión de tokens 
 * de Laravel Sanctum. NO expone rutas públicas.
 */
class AuthController extends Controller
{
    /**
     * Crea un registro de usuario en la DB local del Gateway (sincronización) 
     * y genera un token Sanctum.
     * @param array $userData Los datos del usuario validados y creados por el Auth-Service.
     */
    public function registerFromService(Request $request, $userData)
    {
        // El auth-service ahora usa 'username', pero el Gateway sigue usando 'name' y 'email'
        $identifier = $userData['username'] ?? $userData['email'] ?? null;

        // 1. Buscar o crear el usuario en la DB local del Gateway.
        $user = User::where('email', $identifier)->first();

        if (!$user) {
             // Crear el usuario solo con datos de identificación
             $user = User::create([
                 'name' => $userData['username'] ?? $userData['name'] ?? 'User',
                 'email' => $identifier,
                 // Se usa una contraseña aleatoria/dummy, ya que la verificación real 
                 // ocurre en el Auth-Service. Solo necesitamos el registro para Sanctum.
                 'password' => Hash::make(random_bytes(16)), 
             ]);
        }

        // 2. Generar el token de Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registro exitoso. Token generado en Gateway.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 201);
    }

    /**
     * Busca al usuario sincronizado en el Gateway y genera un nuevo token.
     * @param array $userData Los datos del usuario autenticado por el Auth-Service.
     */
    public function loginFromService(Request $request, $userData)
    {
        
        $identifier = $userData['username'] ?? $userData['email'] ?? null;
        
        // Buscar usuario por múltiples campos para compatibilidad
        $user = User::where('email', $identifier)
                    ->orWhere('name', $identifier)
                    ->orWhere('email', 'like', '%' . $identifier . '%')
                    ->first();

       
        if (! $user) {
            return response()->json(['message' => 'Error: Usuario no sincronizado en Gateway.'], 500);
        }

       
        $user->tokens()->delete();
        
      
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso. Token generado en Gateway.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    /**
     * Invalida el token de Sanctum usado en la petición actual (Logout).
     */
    public function logoutUser(Request $request)
    {
        // 1. Asegurar que haya un usuario autenticado
        if (!$request->user()) {
            return response()->json(['message' => 'No hay sesión activa.'], 401);
        }

        // 2. Revocar el token que se usó en esta petición
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.'], 200);
    }
}
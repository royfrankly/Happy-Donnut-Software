<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

// REFACTORIZACIÓN: Añadir métodos para que el GatewayController los use
class AuthController extends Controller
{
    // Método de registro que solo usa el GatewayController.
    // Asume que el usuario YA FUE CREADO en el Auth-Service.
    public function registerFromService(Request $request, $userData)
    {
        // NOTA: En un sistema real, aquí sincronizarías el usuario con la DB local
        // o usarías un sistema de caché. Por simplicidad, solo generamos el token
        // basándonos en el email que ya fue validado y creado por el Auth-Service.
        
        $user = User::where('email', $userData['email'])->first();

        // Si el usuario no existe en la DB local del Gateway (lo cual sería ideal)
        // podrías crearlo aquí basado en $userData si lo necesitas.
        if (!$user) {
             $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                // NOTA: Nunca guardamos la contraseña aquí, solo los datos de identificación
                'password' => Hash::make(random_bytes(16)), // Contraseña aleatoria si no se usa
            ]);
        }


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado y token generado en Gateway.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 201);
    }

    // Método de login que solo usa el GatewayController.
    // Asume que el Auth-Service ya validó las credenciales.
    public function loginFromService(Request $request, $userData)
    {
        $user = User::where('email', $userData['email'])->first();

        if (! $user) {
            return response()->json(['message' => 'Error de sincronización de usuario en Gateway.'], 500);
        }

        // Eliminar tokens viejos y crear uno nuevo
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión y token generado en Gateway.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }
    
    // Dejamos el resto de los métodos si los necesitas.
    // public function register(Request $request) { /* ... */ }
    // public function login(Request $request) { /* ... */ }
    // public function logout(Request $request) { /* ... */ }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Endpoint para el registro de nuevos usuarios.
     * POST /api/v1/register
     */
    public function register(Request $request)
    {
        try {
            // 1. Validar solo los campos requeridos por el formulario
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

        } catch (ValidationException $e) {
            // Retorna errores 422 si la validación falla
            return response()->json([
                'message' => 'Los datos de registro son inválidos.',
                'errors' => $e->errors(),
            ], 422);
        }

        // 2. Crear el usuario. Los campos 'apellido', 'dni', 'rol' se omiten y serán NULL en la DB.
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password), // Cifrar la contraseña
                
                // 🛑 Los campos 'apellido', 'dni' y 'rol' se omiten y serán NULL gracias a la migración
            ]);
        } catch (\Exception $e) {
            \Log::error('Fallo al crear usuario en DB:', ['error' => $e->getMessage(), 'request' => $request->all()]);
            return response()->json([
                'message' => 'Error interno del servidor al crear el usuario.',
            ], 500);
        }

        // 3. Retornamos el usuario creado 
        return response()->json([
            'message' => 'Usuario registrado en el Auth-Service.',
            'user' => $user,
        ], 201);
    }

    /**
     * Endpoint para la verificación de credenciales de inicio de sesión.
     * POST /api/v1/login
     */
    public function login(Request $request)
    {
        // ... (Tu lógica de login se mantiene igual)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Verificar si el usuario existe y si la contraseña es correcta
        if (! $user || ! Hash::check($request->password, $user->password)) {
            // Respuesta de fallo de autenticación
            return response()->json([
                'message' => 'Credenciales de inicio de sesión inválidas.',
            ], 401);
        }

        // Retornamos el usuario autenticado (sin token)
        return response()->json([
            'message' => 'Autenticación exitosa en el Auth-Service.',
            'user' => $user,
        ], 200);
    }
    
    // 🛑 Métodos para el Gateway (Deben permanecer si los usas en GatewayController):

    public function registerFromService(Request $request, $userData)
    {
        $user = User::where('email', $userData['email'])->first();

        // Si el usuario no existe en la DB local del Gateway (lo cual puede pasar)
        if (!$user) {
            // Creamos una representación mínima del usuario en la DB local del Gateway
             $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make(Str::random(16)), 
                // Estos campos ahora pueden ser nulos, pero los pasamos si existen en $userData
                'apellido' => $userData['apellido'] ?? null, 
                'dni' => $userData['dni'] ?? null,
                'rol' => $userData['rol'] ?? 'user',
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

    public function loginFromService(Request $request, $userData)
    {
        $user = User::where('email', $userData['email'])->first();

        if (! $user) {
             return response()->json(['message' => 'Error de sincronización de usuario en Gateway.'], 500);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión y token generado en Gateway.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 200);
    }
}
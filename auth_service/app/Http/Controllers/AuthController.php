<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Endpoint para el registro de nuevos usuarios.
     * POST /api/v1/register
     */
    public function register(Request $request)
    {
        try {
            // Validar exactamente los campos que el Gateway enviará
            $request->validate([
                'name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Los datos de registro son inválidos.',
                'errors' => $e->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Cifrar la contraseña
        ]);

        // Retornamos el usuario creado (sin token, eso lo hace el Gateway)
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
}
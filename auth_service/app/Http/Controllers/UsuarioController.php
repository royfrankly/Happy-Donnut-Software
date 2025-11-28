<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function show($id)
    {
        $user = User::find($id);
        if (! $user) return response()->json(['message' => 'Not found'], 404);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'dni' => 'nullable|string|unique:users,dni',
            'rol' => 'nullable|string',
            'estado' => 'boolean',
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);

        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Usuario creado',
                'data' => $user,
            ], 201);
        }

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (! $user) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'name' => 'nullable|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'dni' => 'nullable|string|unique:users,dni,' . $user->id,
            'rol' => 'nullable|string',
            'estado' => 'boolean',
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Usuario actualizado',
                'data' => $user,
            ], 200);
        }

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (! $user) return response()->json(['message' => 'Not found'], 404);
        $user->delete();

        if (request()->header('X-Debug') === 'true') {
            return response()->json(['message' => 'Usuario eliminado'], 200);
        }

        return response()->noContent();
    }
}

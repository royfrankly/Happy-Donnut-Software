<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdministrativoController extends Controller
{
    public function index()
    {
        return response()->json(Administrativo::all());
    }

    public function show($id)
    {
        $admin = Administrativo::find($id);
        if (! $admin) return response()->json(['message' => 'Not found'], 404);
        return response()->json($admin);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'dni' => 'required|string|unique:administrativos,dni',
            'telefono' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'estado' => 'boolean',
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $admin = Administrativo::create($data);

        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Administrativo creado',
                'data' => $admin,
            ], 201);
        }

        return response()->json($admin, 201);
    }

    public function update(Request $request, $id)
    {
        $admin = Administrativo::find($id);
        if (! $admin) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'nombre' => 'nullable|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'dni' => 'nullable|string|unique:administrativos,dni,' . $admin->administrativo_id . ',administrativo_id',
            'telefono' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'estado' => 'boolean',
        ]);

        if (! empty($data['password'])) {
            $data['password_hash'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $admin->update($data);

        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Administrativo actualizado',
                'data' => $admin,
            ], 200);
        }

        return response()->json($admin);
    }

    public function destroy($id)
    {
        $admin = Administrativo::find($id);
        if (! $admin) return response()->json(['message' => 'Not found'], 404);
        $admin->delete();

        if (request()->header('X-Debug') === 'true') {
            return response()->json(['message' => 'Administrativo eliminado'], 200);
        }

        return response()->noContent();
    }
}

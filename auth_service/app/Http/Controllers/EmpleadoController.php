<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmpleadoController extends Controller
{
    public function index()
    {
        return response()->json(Empleado::all());
    }

    public function show($id)
    {
        $empleado = Empleado::find($id);
        if (! $empleado) return response()->json(['message' => 'Not found'], 404);
        return response()->json($empleado);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'dni' => 'required|string|unique:empleados,dni',
            'telefono' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'estado' => 'boolean',
        ]);

        if (! empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $empleado = Empleado::create($data);

        // Mostrar mensaje solo si se envía el header X-Debug: true
        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Empleado creado',
                'data' => $empleado,
            ], 201);
        }

        // Respuesta compacta por defecto (sin mensaje) para no romper el frontend
        return response()->json($empleado, 201);
    }

    public function update(Request $request, $id)
    {
        $empleado = Empleado::find($id);
        if (! $empleado) return response()->json(['message' => 'Not found'], 404);

        $data = $request->validate([
            'nombre' => 'nullable|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'dni' => 'nullable|string|unique:empleados,dni,' . $empleado->empleado_id . ',empleado_id',
            'telefono' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'estado' => 'boolean',
        ]);

        if (! empty($data['password'])) {
            $data['password_hash'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $empleado->update($data);

        if ($request->header('X-Debug') === 'true') {
            return response()->json([
                'message' => 'Empleado actualizado',
                'data' => $empleado,
            ], 200);
        }

        return response()->json($empleado);
    }

    public function destroy($id)
    {
        $empleado = Empleado::find($id);
        if (! $empleado) return response()->json(['message' => 'Not found'], 404);
        $empleado->delete();

        if (request()->header('X-Debug') === 'true') {
            return response()->json(['message' => 'Empleado eliminado'], 200);
        }

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\LoteInsumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LoteInsumoController extends Controller
{
    /**
     * Registra una nueva entrada de insumo (compra), creando un lote y su primer movimiento.
     */
    public function store(Request $request)
    {
        // === PROGRAMACIÓN DEFENSIVA: Validación en la frontera ===
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|integer|exists:insumos,id',
            'cantidad_inicial' => 'required|numeric|min:0.01',
            'fecha_vencimiento' => 'nullable|date|after_or_equal:today',
            'precio_compra_unitario' => 'required|numeric|min:0|max:999999.99',
            'descripcion' => 'nullable|string|max:500',
        ], [
            'fecha_vencimiento.after_or_equal' => 'La fecha de vencimiento no puede ser anterior a hoy.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Datos inválidos para registrar la entrada de insumo.',
                'detalle' => $validator->errors()
            ], 422);
        }

        $datos = $validator->validated();

        try {
            $loteCreado = DB::transaction(function () use ($datos) {
                // Crear el lote de insumo
                $nuevoLote = LoteInsumo::create([
                    'insumo_id' => $datos['insumo_id'],
                    'cantidad_inicial' => $datos['cantidad_inicial'],
                    'cantidad_restante' => $datos['cantidad_inicial'],
                    'fecha_vencimiento' => $datos['fecha_vencimiento'] ?? null,
                    'precio_compra_unitario' => $datos['precio_compra_unitario'],
                    'descripcion' => $datos['descripcion'] ?? null,
                ]);

                // Registrar el movimiento asociado (tipo: entrada)
                $nuevoLote->movimientos()->create([
                    'tipo_movimiento' => 'entrada_compra',
                    'cantidad' => $datos['cantidad_inicial'],
                    'motivo' => 'Compra de inventario',
                ]);

                return $nuevoLote;
            });

            // === ASERCIÓN: validar que el lote fue persistido con ID ===
            assert($loteCreado->id !== null, 'Error lógico: el lote no fue guardado en la base de datos.');

            return response()->json([
                'message' => 'Entrada de insumo registrada exitosamente.',
                'lote' => $loteCreado->load('insumo')
            ], 201);

        } catch (QueryException $e) {
            \Log::error('Error en BD al registrar lote: ' . $e->getMessage());
            return response()->json([
                'error' => 'No se pudo registrar la entrada. Verifique los datos o intente más tarde.'
            ], 500);

        } catch (\Exception $e) {
            \Log::error('Error inesperado al registrar lote: ' . $e->getMessage());
            return response()->json([
                'error' => 'Ocurrió un error inesperado.'
            ], 500);
        }
    }

    /**
     * Lista todos los lotes con sus insumos relacionados.
     */
    public function index()
    {
        try {
            $lotes = LoteInsumo::with('insumo')->latest()->get();
            return response()->json($lotes, 200);
        } catch (QueryException $e) {
            \Log::error('Error al listar lotes: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo cargar el historial de lotes.'], 500);
        }
    }

    /**
     * Muestra un lote específico.
     */
    public function show(LoteInsumo $loteInsumo)
    {
        try {
            return response()->json($loteInsumo->load('insumo'), 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Lote no encontrado.'], 404);
        }
    }

    /**
     * Actualiza solo la fecha de vencimiento de un lote.
     */
    public function update(Request $request, LoteInsumo $loteInsumo)
    {
        $validator = Validator::make($request->all(), [
            'fecha_vencimiento' => 'nullable|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Fecha de vencimiento inválida.',
                'detalle' => $validator->errors()
            ], 422);
        }

        try {
            $loteInsumo->update($validator->validated());
            return response()->json($loteInsumo, 200);
        } catch (QueryException $e) {
            \Log::error('Error al actualizar lote ID ' . $loteInsumo->id . ': ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo actualizar el lote.'], 500);
        }
    }

    /**
     * Elimina un lote, solo si no ha sido consumido.
     */
    public function destroy(LoteInsumo $loteInsumo)
    {
        if ($loteInsumo->cantidad_restante < $loteInsumo->cantidad_inicial) {
            return response()->json([
                'error' => 'No se puede eliminar un lote que ya ha sido utilizado.'
            ], 422);
        }

        try {
            $loteInsumo->delete();
            return response()->json(null, 204);
        } catch (QueryException $e) {
            \Log::error('Error al eliminar lote ID ' . $loteInsumo->id . ': ' . $e->getMessage());
            return response()->json([
                'error' => 'No se pudo eliminar el lote. Posiblemente está en uso.'
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;


use App\Models\LoteInsumo;
use App\Models\MovimientoInventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LoteInsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'insumo_id' => 'required|exists:insumos,id',
            'cantidad_inicial' => 'required|numeric|min:0.01',
            'fecha_vencimiento' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $datos = $validator->validated();

        try {
            $loteCreado = DB::transaction(function () use ($datos) {

                $nuevoLote = LoteInsumo::create([
                    'insumo_id' => $datos['insumo_id'],
                    'cantidad_inicial' => $datos['cantidad_inicial'],
                    'cantidad_restante' => $datos['cantidad_inicial'],
                    'fecha_vencimiento' => $datos['fecha_vencimiento'] ?? null,
                ]);

                $nuevoLote->movimientos()->create([
                    'tipo_movimiento' => 'entrada',
                    'cantidad' => $datos['cantidad_inicial'],
                    'motivo' => 'Compra de inventario',
                ]);

                return $nuevoLote;
            });

            return response()->json($loteCreado, 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo registrar el lote.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(LoteInsumo $loteInsumo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoteInsumo $loteInsumo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LoteInsumo $loteInsumo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoteInsumo $loteInsumo)
    {
        //
    }
}

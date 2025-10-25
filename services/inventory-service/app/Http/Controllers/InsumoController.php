<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Insumo; // Para poder usar el modelo Insumo
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class InsumoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index()
{
    // Carga todos los insumos y, para cada uno,
    // crea un nuevo campo virtual llamado 'stock_total'
    // que es la suma de la 'cantidad_restante' de todos sus lotes.
    $insumos = Insumo::withSum('lotes', 'cantidad_restante')->get();

    return response()->json($insumos);
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
    // Primero, validamos que los datos que llegan son correctos
    $validator = Validator::make($request->all(), [
        'nombre' => 'required|string|unique:insumos|max:255',
        'unidad_medida' => 'required|string|max:50',
        'stock_minimo_alerta' => 'required|numeric|min:0',
    ]);

    // Si la validación falla, devolvemos un error 422 con los detalles
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Si todo está bien, creamos el insumo en la base de datos
    $insumo = Insumo::create($validator->validated());

    // Finalmente, devolvemos una respuesta JSON con el insumo creado
    // y el código de estado correcto '201 Created'
    return response()->json($insumo, 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Insumo $insumo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Insumo $insumo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Insumo $insumo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Insumo $insumo)
    {
        //
    }

    public function consultarAlertasDeStock()
{
    // Esta consulta es más avanzada:
    // 1. Suma el stock total de cada insumo (como antes).
    // 2. Utiliza 'having' para filtrar y devolver solo aquellos
    //    cuya suma de stock sea MENOR que su propio campo 'stock_minimo_alerta'.
    $insumosConAlerta = Insumo::withSum('lotes', 'cantidad_restante')
        ->having(DB::raw('lotes_sum_cantidad_restante'), '<', DB::raw('stock_minimo_alerta'))
        ->get();

    if ($insumosConAlerta->isEmpty()) {
        return response()->json(['message' => 'No hay alertas de stock.'], 200);
    }

    return response()->json($insumosConAlerta);
}
}

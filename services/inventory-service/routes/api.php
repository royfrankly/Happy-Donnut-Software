<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\InsumoController;
use App\Http\Controllers\LoteInsumoController;
use App\Http\Controllers\MovimientoInventarioController;
use App\Http\Controllers\AuthController; // Importación añadida

// Ruta pública (no necesita token)
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas (requieren token de autenticación)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rutas para gestionar Categorías, Productos e Insumos
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('productos', ProductoController::class);
    Route::apiResource('insumos', InsumoController::class);
    Route::apiResource('productos', ProductoController::class); // <-- AÑADIDO

    // Ruta para gestionar los lotes de insumos
    Route::apiResource('lotes-insumos', LoteInsumoController::class);

    // Ruta para registrar movimientos de inventario
    Route::get('movimientos-inventario', [MovimientoInventarioController::class, 'index']); // <-- AÑADIDO
    Route::post('movimientos-inventario', [MovimientoInventarioController::class, 'store']);
    Route::post('/movimientos/salida', [MovimientoInventarioController::class, 'registrarSalida']);

    // Ruta para consultar alertas de stock
    Route::get('/stock/alertas', [InsumoController::class, 'consultarAlertasDeStock']);
});

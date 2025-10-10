<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\InsumoController;
use App\Http\Controllers\LoteInsumoController; // Lo crearemos ahora
use App\Http\Controllers\MovimientoInventarioController;

// Rutas para gestionar Categorías, Productos e Insumos (CRUDs básicos)
Route::apiResource('categorias', CategoriaController::class);
Route::apiResource('productos', ProductoController::class);
Route::apiResource('insumos', InsumoController::class);

// Ruta principal para gestionar los lotes de insumos
Route::apiResource('lotes-insumos', LoteInsumoController::class);

// Ruta para registrar otros movimientos (como mermas o ajustes)
Route::post('movimientos-inventario', [MovimientoInventarioController::class, 'store']);

// Rutas para Movimientos de Inventario
Route::post('/movimientos/salida', [MovimientoInventarioController::class, 'registrarSalida']);


// Ruta para consultar alertas de stock
Route::get('/stock/alertas', [InsumoController::class, 'consultarAlertasDeStock']);
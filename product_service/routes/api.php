<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\PromocionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->prefix('/v1')->group(function () {
    // Productos
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::put('/products/{id}/status', [ProductController::class, 'updateStatus']);
    
    // Categorías
    Route::get('/categories', [CategoriaController::class, 'index']);
    Route::post('/categories', [CategoriaController::class, 'store']);
    Route::get('/categories/{id}', [CategoriaController::class, 'show']);
    Route::put('/categories/{id}', [CategoriaController::class, 'update']);
    Route::delete('/categories/{id}', [CategoriaController::class, 'destroy']);
    
    // Promociones
    Route::get('/promotions', [PromocionController::class, 'index']);
    Route::post('/promotions', [PromocionController::class, 'store']);
    Route::get('/promotions/{id}', [PromocionController::class, 'show']);
    Route::put('/promotions/{id}', [PromocionController::class, 'update']);
    Route::delete('/promotions/{id}', [PromocionController::class, 'destroy']);
});

// Rutas públicas (sin autenticación)
Route::prefix('/v1')->group(function () {
    Route::get('/products/available', [ProductController::class, 'getAvailable']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::get('/categories', [CategoriaController::class, 'index']);
    Route::get('/promotions/active', [PromocionController::class, 'getActive']);
});

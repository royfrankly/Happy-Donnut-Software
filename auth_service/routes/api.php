<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\AdministrativoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CommentController;

// Agrupar las rutas de autenticación bajo /api/v1/
Route::prefix('v1')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

// CRUD para empleados, administrativos y usuarios
Route::prefix('v1')->group(function () {
    Route::apiResource('empleados', EmpleadoController::class);
    Route::apiResource('administrativos', AdministrativoController::class);
    Route::apiResource('usuarios', UsuarioController::class);

    // Comentarios anidados bajo usuarios (los "clientes" son usuarios)
    Route::get('usuarios/{usuario}/comments', [CommentController::class,'index']);
    Route::post('usuarios/{usuario}/comments', [CommentController::class,'store']);
});
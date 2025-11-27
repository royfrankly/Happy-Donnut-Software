<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Agrupar las rutas de autenticación bajo /api/v1/
Route::prefix('v1')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});
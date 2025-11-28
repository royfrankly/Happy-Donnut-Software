<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GatewayController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function (){
    Route::post('login',[GatewayController::class,'login']);
    Route::post('register',[GatewayController::class,'register']);
});

Route::middleware('auth:sanctum')->group(function (){

    Route::prefix('inventory')->group(function(){
        Route::get('/',[GatewayController::class,'getProducts']);
        Route::get('/{id}',[GatewayController::class,'getProduct']);
        Route::get('/',[GatewayController::class,'createProducts']);
    });

    Route::prefix('orders')->group(function(){
        Route::get('/',[GatewayController::class,'getOrders']);
        Route::post('/',[GatewayController::class,'createOrder']);
        Route::put('/{id}/cancel',[GatewayController::class,'cancelOrder']);
    });


    Route::prefix('inventory')->group(function(){
        Route::get('/auth/user', [GatewayController::class,'getProfile']);
        Route::post('/auth/logout',[GatewayController::class,'logout']);
    });

    //// Nota: El Microservicio de Email no necesita rutas directas,
    // ya que es invocado internamente por otros microservicios (o por el Order_Service
    // o el Auth_Service después de ciertas acciones)


});

Route::get('/health', function () {
    return response()->json(['status' => 'Conectado al Gateway']);
});

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Importante mantener esto

class HealthController extends Controller
{
    public function health()
    {
        try {

            DB::select('SELECT 1'); 
            
            return response()->json(['status' => 'Conectado a la base de datos']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'Error de conexión'], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;

class GatewayController extends Controller{
    protected const INVENTORY_URL = 'http://inventory-service:8081';
    protected const ORDER_URL = 'http://order-service:8082';
    // 🛑 ASUMIENDO que el Auth-Service corre en el puerto 9000 del contenedor
    protected const AUTH_URL = 'http://auth-service:9000'; 


    protected function makeServiceRequest(Request $request, string $url,string $method = 'get'){
        // ... (Tu función makeServiceRequest se mantiene igual)
        $headers=[];

        if($request->user()){
            $headers['X-User-ID'] = $request->user()->id;     
        }

        if($token = $request->header('Authorization')){
            $headers['Authorization']=$token;
        }

        try{
            $http= Http::withHeaders($headers);

            switch (strtolower($method)){
                case 'post':
                    return $http->post($url, $request->all());
                case 'put':
                    return $http->put($url,$request->all());
                case 'delete':
                    return $http->delete($url,$request->all());
                case 'get':
                    default:
                    return $http->get($url.'?'.$request->getQueryString());
            }
        }catch (Exception $e){
                return response()->json(['error'=> 'Service Unavaliable', 'message'=> $e->getMessage()],503);
        }
    }

    // MODIFICADO: Endpoint de Registro en el Gateway
    public function register(Request $request)
    {
        // 1. Redirigir la petición de registro al Auth-Service
        $response = Http::post(self::AUTH_URL . '/api/v1/register', $request->all());

        // 2. Si el registro en el Auth-Service falla, devolvemos el error.
        if ($response->failed()) {
            return response()->json($response->json(), $response->status());
        }

        // 3. Si el registro es exitoso, tomamos los datos del usuario.
        $user = $response->json('user');
        
        // 4. EL API GATEWAY GENERA EL TOKEN (Usando el AuthController sincronizado)
        // 🛑 CORRECCIÓN: Instanciamos el AuthController y usamos el nuevo método
        $authController = new AuthController();
        return $authController->registerFromService($request, $user);
        
    }


    // MODIFICADO: Endpoint de Login en el Gateway
    public function login(Request $request)
    {
        // 1. Redirigir la petición de login al Auth-Service para verificación de credenciales
        $response = Http::post(self::AUTH_URL . '/api/v1/login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);

        // 2. Si la autenticación falla (401), devolvemos el error inmediatamente.
        if ($response->failed()) {
            return response()->json($response->json(), $response->status());
        }
        
        // 3. Si la autenticación es exitosa (200), tomamos el usuario devuelto.
        $user = $response->json('user');

        // 4. EL API GATEWAY GENERA EL TOKEN (Usando el AuthController sincronizado)
        // 🛑 CORRECCIÓN: Instanciamos el AuthController y usamos el nuevo método
        $authController = new AuthController();
        return $authController->loginFromService($request, $user);
    }
    
    // ... (Debes mantener el resto de tus funciones aquí: getProducts, createProduct, createOrder)
}
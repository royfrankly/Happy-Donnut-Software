<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;


class GatewayController extends Controller{
    protected const INVENTORY_URL = 'http://inventory-service:8081';
    protected const ORDER_URL = 'http:\\order-service:8082';
    protected const AUTH_URL = 'http://localhost:8081';


    protected function makeServiceRequest(Request $request, string $url,string $method = 'get'){
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

    public function login(Request $request)
    {
        $response = Http::post('http://localhost:8081/api/v1/login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json($response->json(), $response->status());
      
      
        //return response()->json([
        //'success' => true,
        //'data' => []
    //]);
      
    }

     public function getProducts(Request $request)
    {
        $response = $this->makeServiceRequest($request, self::INVENTORY_URL . '/v1/products', 'get');
        return $response->toIlluminateResponse();
    }

    public function createProduct(Request $request)
    {
        $response = $this->makeServiceRequest($request, self::INVENTORY_URL . '/v1/products', 'post');
        return $response->toIlluminateResponse();
    }

    public function createOrder(Request $request)
    {
        $response = $this->makeServiceRequest($request, self::ORDER_URL . '/v1/orders', 'post');
        return $response->toIlluminateResponse();
    }
   


}


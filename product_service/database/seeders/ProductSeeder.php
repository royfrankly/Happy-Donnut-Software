<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear categorías
        $categorias = [
            ['nombre_categoria' => 'Donuts Clásicos'],
            ['nombre_categoria' => 'Donuts Especiales'],
            ['nombre_categoria' => 'Café'],
            ['nombre_categoria' => 'Bebidas'],
            ['nombre_categoria' => 'Postres']
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }

        // Crear productos
        $productos = [
            // Donuts Clásicos
            [
                'categoria_id' => 1,
                'nombre_producto' => 'Donut Glaseado Clásico',
                'descripcion' => 'Donut tradicional con glaseado de azúcar',
                'precio_base' => 2.50,
                'tipo_producto' => 'donut',
                'activo_web' => true
            ],
            [
                'categoria_id' => 1,
                'nombre_producto' => 'Donut de Chocolate',
                'descripcion' => 'Donut cubierto con chocolate rico',
                'precio_base' => 3.00,
                'tipo_producto' => 'donut',
                'activo_web' => true
            ],
            [
                'categoria_id' => 1,
                'nombre_producto' => 'Donut Relleno de Crema',
                'descripcion' => 'Donut suave relleno de crema pastelera',
                'precio_base' => 3.50,
                'tipo_producto' => 'donut',
                'activo_web' => true
            ],
            
            // Donuts Especiales
            [
                'categoria_id' => 2,
                'nombre_producto' => 'Donut Happy Birthday',
                'descripcion' => 'Donut festivo con sprinkles colores',
                'precio_base' => 4.50,
                'tipo_producto' => 'donut',
                'activo_web' => true
            ],
            [
                'categoria_id' => 2,
                'nombre_producto' => 'Donut Matcha',
                'descripcion' => 'Donut con glaseado de té verde matcha',
                'precio_base' => 4.00,
                'tipo_producto' => 'donut',
                'activo_web' => true
            ],
            
            // Café
            [
                'categoria_id' => 3,
                'nombre_producto' => 'Espresso',
                'descripcion' => 'Café espresso intenso y concentrado',
                'precio_base' => 2.00,
                'tipo_producto' => 'cafe',
                'activo_web' => true
            ],
            [
                'categoria_id' => 3,
                'nombre_producto' => 'Cappuccino',
                'descripcion' => 'Espresso con leche espumosa y un toque de canela',
                'precio_base' => 3.50,
                'tipo_producto' => 'cafe',
                'activo_web' => true
            ],
            [
                'categoria_id' => 3,
                'nombre_producto' => 'Latte Happy Donut',
                'descripcion' => 'Nuestra bebida especial con café, leche y un toque especial',
                'precio_base' => 4.00,
                'tipo_producto' => 'cafe',
                'activo_web' => true
            ],
            
            // Bebidas
            [
                'categoria_id' => 4,
                'nombre_producto' => 'Chocolate Caliente',
                'descripcion' => 'Bebida caliente de chocolate espeso',
                'precio_base' => 3.00,
                'tipo_producto' => 'otro',
                'activo_web' => true
            ],
            [
                'categoria_id' => 4,
                'nombre_producto' => 'Limonada Fresca',
                'descripcion' => 'Bebida refrescante de limón natural',
                'precio_base' => 2.50,
                'tipo_producto' => 'otro',
                'activo_web' => true
            ],
            
            // Postres
            [
                'categoria_id' => 5,
                'nombre_producto' => 'Brownie de Chocolate',
                'descripcion' => 'Brownie húmedo de chocolate con nueces',
                'precio_base' => 3.50,
                'tipo_producto' => 'otro',
                'activo_web' => true
            ],
            [
                'categoria_id' => 5,
                'nombre_producto' => 'Tiramisú Mini',
                'descripcion' => 'Porción individual de tiramisú clásico',
                'precio_base' => 4.50,
                'tipo_producto' => 'otro',
                'activo_web' => true
            ]
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
}

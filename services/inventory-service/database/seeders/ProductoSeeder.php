<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;
use App\Models\Categoria;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find categories to associate products with
        $catClasicas = Categoria::where('nombre', 'Donas Clásicas')->first();
        $catRellenas = Categoria::where('nombre', 'Donas Rellenas')->first();
        $catBebidas = Categoria::where('nombre', 'Bebidas')->first();

        if ($catClasicas) {
            Producto::create([
                'nombre_producto' => 'Dona de Chocolate',
                'descripcion' => 'Dona clásica cubierta de chocolate.',
                'precio_base' => 3.50,
                'categoria_id' => $catClasicas->id
            ]);
        }

        if ($catRellenas) {
            Producto::create([
                'nombre_producto' => 'Dona Rellena de Fresa',
                'descripcion' => 'Dona esponjosa rellena de mermelada de fresa.',
                'precio_base' => 4.00,
                'categoria_id' => $catRellenas->id
            ]);
        }

        if ($catBebidas) {
            Producto::create([
                'nombre_producto' => 'Café Americano',
                'descripcion' => 'Café negro caliente preparado al momento.',
                'precio_base' => 5.00,
                'categoria_id' => $catBebidas->id
            ]);
        }
    }
}
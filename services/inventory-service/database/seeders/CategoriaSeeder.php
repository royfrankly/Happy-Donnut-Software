<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::create(['nombre' => 'Donas Clásicas']);
        Categoria::create(['nombre' => 'Donas Rellenas']);
        Categoria::create(['nombre' => 'Donas Glaseadas']);
        Categoria::create(['nombre' => 'Bebidas']);
    }
}
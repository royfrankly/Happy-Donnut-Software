<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Insumo;

class InsumoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Insumo::create(['nombre' => 'Harina', 'unidad_medida' => 'kg', 'stock_minimo_alerta' => 10.00]);
        Insumo::create(['nombre' => 'Azúcar', 'unidad_medida' => 'kg', 'stock_minimo_alerta' => 10.00]);
        Insumo::create(['nombre' => 'Chocolate en polvo', 'unidad_medida' => 'kg', 'stock_minimo_alerta' => 5.00]);
        Insumo::create(['nombre' => 'Leche', 'unidad_medida' => 'litro', 'stock_minimo_alerta' => 12.00]);
        Insumo::create(['nombre' => 'Huevos', 'unidad_medida' => 'unidad', 'stock_minimo_alerta' => 24.00]);
        Insumo::create(['nombre' => 'Mermelada de Fresa', 'unidad_medida' => 'kg', 'stock_minimo_alerta' => 5.00]);
        Insumo::create(['nombre' => 'Café en grano', 'unidad_medida' => 'kg', 'stock_minimo_alerta' => 8.00]);
        Insumo::create(['nombre' => 'Vasos de cartón', 'unidad_medida' => 'unidad', 'stock_minimo_alerta' => 50.00]);
    }
}
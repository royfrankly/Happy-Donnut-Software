<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('insumos', function (Blueprint $table) {
            $table->id('insumo_id');
            $table->string('nombre_insumo')->unique();
            $table->string('unidad_medida_base', 50);
            $table->decimal('stock_minimo_alerta', 10, 2)->unsigned();
            $table->decimal('stock_total_calculado', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insumos');
    }
};

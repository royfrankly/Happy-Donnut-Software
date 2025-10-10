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
        Schema::create('recetas', function (Blueprint $table) {
            $table->foreignId('producto_id')->constrained('productos', 'producto_id');
            $table->foreignId('insumo_id')->constrained('insumos', 'insumo_id');
            $table->decimal('cantidad_necesaria', 10, 2);

            // Llave primaria compuesta
            $table->primary(['producto_id', 'insumo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recetas');
    }
};

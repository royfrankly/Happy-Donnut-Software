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
        Schema::create('promociones_detalles', function (Blueprint $table) {
            $table->foreignId('promocion_id')->constrained('promociones', 'promocion_id')->onDelete('cascade');
            $table->foreignId('producto_id')->constrained('productos', 'producto_id')->onDelete('cascade');
            $table->integer('cantidad_producto');

            // Llave primaria compuesta
            $table->primary(['promocion_id', 'producto_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promociones_detalle');
    }
};

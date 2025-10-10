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
        Schema::create('productos', function (Blueprint $table) {
            // La llave primaria NO es autoincremental, se replica desde el Product Service
            $table->unsignedBigInteger('producto_id')->primary();
            $table->string('nombre_producto');
            $table->string('tipo_producto', 50); // ej: 'PREPARADO', 'COMPRADO'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_productos');
    }
};

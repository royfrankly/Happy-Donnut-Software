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
        $table->id(); // ID único para cada producto
        $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade'); // Relación con la tabla categorias
        $table->string('nombre_producto')->unique(); // Nombre del producto (ej. "Dona de Chocolate")
        $table->text('descripcion')->nullable(); // Descripción opcional
        $table->decimal('precio_base', 10, 2); // Precio de venta
        $table->timestamps(); // Campos created_at y updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};

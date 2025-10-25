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
        $table->id(); // ID único para la materia prima
        $table->string('nombre')->unique(); // Nombre (ej. "Harina de Trigo")
        $table->text('descripcion')->nullable(); // Descripción opcional
        $table->string('unidad_medida'); // ej. "kg", "litro", "unidad"
        $table->decimal('stock_minimo_alerta', 10, 2); // Umbral para alertas
        $table->softDeletes(); // <-- AÑADIDO PARA BORRADO LÓGICO
        $table->timestamps(); // Campos created_at y updated_at
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

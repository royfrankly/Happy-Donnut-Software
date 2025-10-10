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
    Schema::create('lotes_insumos', function (Blueprint $table) {
        $table->id(); // ID único para el lote
        $table->foreignId('insumo_id')->constrained('insumos')->onDelete('cascade'); // Relación con la tabla insumos
        $table->decimal('cantidad_inicial', 10, 2); // Cantidad que se compró
        $table->decimal('cantidad_restante', 10, 2); // Cantidad que queda actualmente
        $table->date('fecha_vencimiento')->nullable(); // Fecha de vencimiento opcional
        $table->timestamps(); // La fecha de creación (created_at) será la fecha de compra
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lote_insumos');
    }
};

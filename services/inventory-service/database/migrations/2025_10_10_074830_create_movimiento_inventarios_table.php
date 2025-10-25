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
    Schema::create('movimientos_inventarios', function (Blueprint $table) {
        $table->id(); // ID único del movimiento
        $table->foreignId('lote_insumo_id')->constrained('lotes_insumos')->onDelete('cascade'); // A qué lote afectó
        $table->enum('tipo_movimiento', ['entrada', 'salida_manual', 'salida_venta']); // Tipo de movimiento
        $table->decimal('cantidad', 10, 2); // Cantidad que se movió (siempre positiva)
        $table->string('motivo')->nullable(); // ej. "Compra a proveedor", "Merma por humedad"
        $table->timestamps(); // Fecha y hora del movimiento
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimientos_inventarios');
    }
};

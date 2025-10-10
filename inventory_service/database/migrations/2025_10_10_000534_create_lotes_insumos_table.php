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
            $table->id('lote_id');
            $table->foreignId('insumo_id')->constrained('insumos', 'insumo_id');
            $table->decimal('cantidad_comprada', 10, 2);
            $table->decimal('cantidad_restante', 10, 2);
            $table->decimal('costo_total_compra', 10, 2);
            $table->date('fecha_compra');
            $table->date('fecha_caducidad')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lotes_insumos');
    }
};

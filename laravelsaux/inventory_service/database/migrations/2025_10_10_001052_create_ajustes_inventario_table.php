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
        Schema::create('ajustes_inventario', function (Blueprint $table) {
            $table->id('ajuste_id');
            $table->foreignId('lote_id')->constrained('lotes_insumos', 'lote_id');
            $table->unsignedBigInteger('empleado_id'); // ID externo del Auth Service
            $table->decimal('cantidad', 10, 2);
            $table->string('motivo');
            $table->timestamp('fecha_ajuste')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ajustes_inventario');
    }
};

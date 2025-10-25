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
        Schema::create('log_notificaciones', function (Blueprint $table) {
            $table->id('log_id');
            $table->string('destinatario');
            $table->string('asunto');
            $table->string('tipo_notificacion'); // ej: 'VentaRealizada', 'StockBajo'
            $table->string('estado'); // ej: 'ENVIADO', 'FALLIDO'
            $table->text('mensaje_error')->nullable(); // Para guardar el error si el envío falla
            $table->timestamp('fecha_envio')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_notificaciones');
    }
};

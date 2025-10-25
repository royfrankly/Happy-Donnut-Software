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
        Schema::create('ventas', function (Blueprint $table) {
        $table->id('venta_id');
        $table->unsignedBigInteger('cliente_id')->nullable(); // Puede ser un cliente anónimo
        $table->unsignedBigInteger('empleado_id'); // ID externo del Auth Service
        $table->decimal('total_venta', 10, 2);
        $table->string('estado_pedido', 50); // ej: 'recibido', 'entregado'
        $table->timestamp('fecha_venta')->useCurrent();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};

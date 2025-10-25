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
        Schema::create('detalles_venta', function (Blueprint $table) {
            $table->id('detalle_id');
            $table->foreignId('venta_id')->constrained('ventas', 'venta_id');
            $table->unsignedBigInteger('producto_id'); // ID externo del Product Service

            // --- INICIO DE DATOS SNAPSHOT ---
            $table->string('nombre_producto');
            $table->decimal('precio_unitario_venta', 10, 2);
            // --- FIN DE DATOS SNAPSHOT ---

            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalles_venta');
    }
};

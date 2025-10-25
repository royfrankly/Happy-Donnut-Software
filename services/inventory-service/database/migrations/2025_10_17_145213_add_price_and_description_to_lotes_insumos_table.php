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
        Schema::table('lotes_insumos', function (Blueprint $table) {
            $table->decimal('precio_compra_unitario', 10, 2)->after('cantidad_restante')->default(0);
            $table->string('descripcion')->after('precio_compra_unitario')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lotes_insumos', function (Blueprint $table) {
            $table->dropColumn(['precio_compra_unitario', 'descripcion']);
        });
    }
};

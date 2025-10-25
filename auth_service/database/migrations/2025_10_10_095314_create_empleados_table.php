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
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('empleado_id');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('dni')->unique();
            $table->string('telefono')->nullable();
            $table->string('rol'); // Ej: 'ADMIN', 'EMPLEADO'
            $table->string('password_hash');
            $table->boolean('estado')->default(true);
            $table->timestamps(); // Crea 'created_at' y 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};

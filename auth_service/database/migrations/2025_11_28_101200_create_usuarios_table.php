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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('usuario_id');
            $table->unsignedBigInteger('persona_id')->nullable();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('role')->nullable();
            $table->boolean('estado')->default(true);
            $table->timestamps();

            $table->foreign('persona_id')->references('persona_id')->on('personas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};

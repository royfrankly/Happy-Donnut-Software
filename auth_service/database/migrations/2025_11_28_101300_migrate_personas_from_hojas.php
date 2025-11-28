<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrate data from empleados -> personas and administrativos -> personas
        DB::transaction(function () {
            // Empleados
            DB::table('empleados')->orderBy('empleado_id')->chunk(100, function ($empleados) {
                foreach ($empleados as $e) {
                    $persona = null;
                    if (!empty($e->dni)) {
                        $persona = DB::table('personas')->where('dni', $e->dni)->first();
                    }
                    if (!$persona && !empty($e->email)) {
                        $persona = DB::table('personas')->where('email', $e->email)->first();
                    }

                    if ($persona) {
                        $personaId = $persona->persona_id;
                    } else {
                        $personaId = DB::table('personas')->insertGetId([
                            'nombre' => $e->nombre,
                            'apellido' => $e->apellido,
                            'dni' => $e->dni,
                            'telefono' => $e->telefono,
                            'email' => $e->email,
                            'estado' => isset($e->estado) ? $e->estado : true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }

                    DB::table('empleados')->where('empleado_id', $e->empleado_id)->update(['persona_id' => $personaId]);
                }
            });

            // Administrativos
            DB::table('administrativos')->orderBy('administrativo_id')->chunk(100, function ($admins) {
                foreach ($admins as $a) {
                    $persona = null;
                    if (!empty($a->dni)) {
                        $persona = DB::table('personas')->where('dni', $a->dni)->first();
                    }
                    if (!$persona && !empty($a->email)) {
                        $persona = DB::table('personas')->where('email', $a->email)->first();
                    }

                    if ($persona) {
                        $personaId = $persona->persona_id;
                    } else {
                        $personaId = DB::table('personas')->insertGetId([
                            'nombre' => $a->nombre,
                            'apellido' => $a->apellido,
                            'dni' => $a->dni,
                            'telefono' => $a->telefono,
                            'email' => $a->email,
                            'estado' => isset($a->estado) ? $a->estado : true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }

                    DB::table('administrativos')->where('administrativo_id', $a->administrativo_id)->update(['persona_id' => $personaId]);
                }
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration performs data copying. Reverting safely is non-trivial and is left as NO-OP.
    }
};

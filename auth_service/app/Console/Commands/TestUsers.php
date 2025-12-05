<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Verificando tabla usuarios ===');
        
        $users = \App\Models\User::all();
        
        $this->info('Total usuarios: ' . $users->count());
        
        if ($users->count() > 0) {
            $this->table(
                ['ID', 'Username', 'Role', 'Estado', 'Creado'],
                $users->map(function ($user) {
                    return [
                        $user->usuario_id,
                        $user->username,
                        $user->role,
                        $user->estado ? 'Activo' : 'Inactivo',
                        $user->created_at
                    ];
                })
            );
        } else {
            $this->warn('No hay usuarios en la tabla');
        }
        
        $this->info(PHP_EOL . '=== Verificando tokens ===');
        
        $tokens = \Laravel\Sanctum\PersonalAccessToken::all();
        
        $this->info('Total tokens: ' . $tokens->count());
        
        if ($tokens->count() > 0) {
            $this->table(
                ['ID', 'Tokenable ID', 'Name', 'Abilities', 'Creado'],
                $tokens->map(function ($token) {
                    return [
                        $token->id,
                        $token->tokenable_id,
                        $token->name,
                        implode(', ', $token->abilities),
                        $token->created_at
                    ];
                })
            );
        } else {
            $this->warn('No hay tokens en la tabla');
        }
        
        return 0;
    }
}

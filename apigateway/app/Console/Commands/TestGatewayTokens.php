<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestGatewayTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-gateway-tokens';

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
        $this->info('=== Verificando tokens en Gateway ===');
        
        $tokens = \Laravel\Sanctum\PersonalAccessToken::all();
        
        $this->info('Total tokens en Gateway: ' . $tokens->count());
        
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
            $this->warn('No hay tokens en el Gateway');
        }
        
        return 0;
    }
}

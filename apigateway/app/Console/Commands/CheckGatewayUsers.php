<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckGatewayUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-gateway-users';

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
        $this->info('=== Verificando usuarios en Gateway ===');
        
        $users = \App\Models\User::all();
        
        $this->info('Total usuarios en Gateway: ' . $users->count());
        
        if ($users->count() > 0) {
            $this->table(
                ['ID', 'Name', 'Email', 'Creado'],
                $users->map(function ($user) {
                    return [
                        $user->id,
                        $user->name,
                        $user->email,
                        $user->created_at
                    ];
                })
            );
        } else {
            $this->warn('No hay usuarios en el Gateway');
        }
        
        return 0;
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            UserSeeder::class,
        ]);
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // Busca al usuario por su email
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'), // Asigna y hashea la contraseña
            ]
        );
    }
}

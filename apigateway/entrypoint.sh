#!/bin/sh
set -e

# Obtiene la variable del host de la base de datos (DB_HOST) del entorno Laravel
DB_HOST=${DB_HOST:-db}  # Usa 'db' como fallback si no se encuentra
DB_PORT=${DB_PORT:-5432} # Obtiene el puerto (5432)

# Espera a que el servidor de base de datos específico (db-auth, db-product, etc.) esté listo
echo "Waiting for database at $DB_HOST:$DB_PORT..."
# Ahora usa la variable DB_HOST en lugar del nombre fijo 'db'
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Database $DB_HOST is ready."

#Ejecuta la generacion de key
echo "Generating application key..."
php artisan key:generate --env=production

# Ejecuta las migraciones automáticamente
echo "Running migrations..."
# Agrega env:production para asegurar que se usen las variables de entorno correctas.
php artisan migrate --force --env=production

# Opcional: Ejecutar seeders si es necesario
# echo "Running seeders..."
# php artisan db:seed --force

# Inicia el proceso principal (PHP-FPM)
echo "Starting PHP-FPM..."
exec php-fpm
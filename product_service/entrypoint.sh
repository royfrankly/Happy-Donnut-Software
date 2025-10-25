#!/bin/sh
set -e

# Espera a que la base de datos 'db' esté lista
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready."

# Ejecuta las migraciones automáticamente
echo "Running migrations..."
php artisan migrate --force

# Inicia el proceso principal (PHP-FPM)
echo "Starting PHP-FPM..."
exec php-fpm
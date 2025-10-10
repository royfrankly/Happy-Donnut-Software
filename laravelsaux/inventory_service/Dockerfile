# Usamos una imagen oficial de PHP 8.2 con FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# Instalar dependencias del sistema necesarias para Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev # <-- Esencial para PostgreSQL

# Instalar extensiones de PHP que Laravel necesita
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Instalar Composer (el gestor de paquetes de PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /var/www

# Copiar los archivos de la aplicación
COPY . .

# Instalar las dependencias de PHP con Composer
RUN composer install

# Cambiar el propietario de las carpetas para que Laravel pueda escribir en ellas
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exponer el puerto 9000 para que el servidor web (Nginx) pueda comunicarse con PHP-FPM
EXPOSE 9000

# El comando que se ejecutará cuando el contenedor inicie
CMD ["php-fpm"]
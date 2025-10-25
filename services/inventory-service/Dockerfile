# Stage 1: Builder
FROM composer:2 as builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-dev --prefer-dist
COPY . .
RUN composer dump-autoload --optimize

# Stage 2: Final Image
FROM php:8.2-fpm-alpine

# Solución: Instalar las librerías de desarrollo de PostgreSQL
RUN apk add --no-cache postgresql-dev

# Instalar las extensiones de PHP necesarias
RUN docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www/html
COPY --from=builder /app/vendor/ ./vendor/
COPY --from=builder /app/ . 
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
EXPOSE 9000
CMD ["php-fpm"]

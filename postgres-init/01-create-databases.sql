-- Archivo: postgres-init/01-create-databases.sql

-- Crea las bases de datos si no existen
-- (La base de datos en POSTGRES_DB se crea automáticamente,
-- así que no necesitamos crearla aquí explícitamente)

CREATE DATABASE auth_db;
CREATE DATABASE product_db;
CREATE DATABASE inventory_db;
CREATE DATABASE order_db;
CREATE DATABASE email_db;
CREATE DATABASE apigateway_db;

-- Opcional: Otorgar privilegios si usaras usuarios diferentes
-- GRANT ALL PRIVILEGES ON DATABASE auth_db TO tu_usuario_auth;
-- GRANT ALL PRIVILEGES ON DATABASE product_db TO tu_usuario_product;
-- ... etc (No necesario si usas el mismo usuario 'admin' para todo)

\echo 'Finished creating databases.'
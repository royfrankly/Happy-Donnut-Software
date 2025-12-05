# Happy Donuts - API Endpoints Documentation

## Overview
Microservicios implementados para Happy Donuts:
- **Product Service**: Gestión de productos y categorías
- **Inventory Service**: Gestión de inventario y recetas
- **Order Service**: Gestión de órdenes y ventas
- **API Gateway**: Autenticación y routing

---

## Product Service (Port 8001)

### Productos
```
GET    /api/v1/products/available    - Productos disponibles para clientes
GET    /api/v1/products/search?q=     - Buscar productos
GET    /api/v1/products               - Listar productos (admin)
POST   /api/v1/products               - Crear producto (admin)
GET    /api/v1/products/{id}          - Ver producto
PUT    /api/v1/products/{id}          - Actualizar producto (admin)
DELETE /api/v1/products/{id}          - Eliminar producto (admin)
PUT    /api/v1/products/{id}/status   - Cambiar estado (admin)
```

### Categorías
```
GET    /api/v1/categories             - Listar categorías
POST   /api/v1/categories             - Crear categoría (admin)
GET    /api/v1/categories/{id}        - Ver categoría
PUT    /api/v1/categories/{id}        - Actualizar categoría (admin)
DELETE /api/v1/categories/{id}        - Eliminar categoría (admin)
```

### Promociones
```
GET    /api/v1/promotions/active      - Promociones activas
GET    /api/v1/promotions             - Listar promociones (admin)
POST   /api/v1/promotions             - Crear promoción (admin)
GET    /api/v1/promotions/{id}        - Ver promoción
PUT    /api/v1/promotions/{id}        - Actualizar promoción (admin)
DELETE /api/v1/promotions/{id}        - Eliminar promoción (admin)
```

---

## Inventory Service (Port 8002)

### Inventario
```
GET    /api/v1/inventory              - Ver inventario completo
POST   /api/v1/inventory/reserve      - Reservar inventario
POST   /api/v1/inventory/release     - Liberar inventario
GET    /api/v1/inventory/check/{productId}/{quantity} - Verificar disponibilidad
PUT    /api/v1/inventory/adjust       - Ajustar inventario manual
```

### Insumos
```
GET    /api/v1/insumos                - Listar insumos
POST   /api/v1/insumos                - Crear insumo (admin)
GET    /api/v1/insumos/{id}           - Ver insumo
PUT    /api/v1/insumos/{id}           - Actualizar insumo (admin)
DELETE /api/v1/insumos/{id}           - Eliminar insumo (admin)
```

### Lotes de Insumos
```
GET    /yez /api经过了v1/l.
```

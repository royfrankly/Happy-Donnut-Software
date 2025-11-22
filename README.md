# Happy-Donnut-Software
software para la microempresa happy donnut

## 🌳 Convención de Ramas 

Para mantener el repositorio organizado, los nombres de las ramas deben indicar claramente **qué** se está haciendo y **dónde**.

### 1. El Modelo (Sintaxis)

Cada rama nueva debe seguir esta estructura exacta:

`tipo/alcance/accion-descripcion`

* **tipo**: La categoría del trabajo (ver lista abajo).
* **alcance**: El microservicio o carpeta afectada (ej: `auth`, `inventory`, `frontend`).
* **accion-descripcion**: Una descripción breve usando guiones (kebab-case) que empiece preferiblemente con un verbo.

> **Ejemplo real:** `feature/auth/implement-google-login`

### 2. Lista de Tipos de Ramas

Usa estos prefijos para categorizar tus ramas:

| Prefijo | Cuándo usarlo (Propósito) | Ejemplo de Nombre |
| :--- | :--- | :--- |
| **`feature/`** | **Nuevas funcionalidades** o cambios en la lógica de negocio. | `feature/order/create-invoice-pdf` |
| **`fix/`** | **Corrección de errores** (*bugs*) normales. | `fix/frontend/pagination-error` |
| **`hotfix/`** | **Errores críticos** que deben arreglarse urgentemente en producción. | `hotfix/auth/security-patch` |
| **`refactor/`** | **Reorganización de código** o limpieza que no cambia la funcionalidad. | `refactor/product/simplify-db-query` |
| **`chore/`** | **Mantenimiento**, actualizaciones de librerías o configuración. | `chore/docker/update-python-version` |
| **`docs/`** | Cambios exclusivos en **documentación**. | `docs/add-architecture-diagram` |
| **`test/`** | Creación o arreglo de **pruebas** (tests). | `test/inventory/add-stock-unit-tests` |
## 📝 Convención de Commits

Para mantener un historial limpio y generar versiones automáticamente, utilizamos la especificación **Conventional Commits**.

### 1. El Modelo (Sintaxis)

Cada mensaje de commit debe seguir esta estructura exacta:

`tipo(alcance): descripción`

* **tipo**: La clase de cambio que estás haciendo (ver lista abajo).
* **alcance**: (Opcional pero recomendado) El microservicio o módulo afectado (ej: `auth`, `frontend`, `inventory`).
* **descripción**: Un resumen corto y claro de lo que se hizo (en imperativo, ej: "añadir", "corregir", no "añadido" o "corregí").

> **Ejemplo real:** `feat(auth): implementar login con Google`

### 2. Lista de Tipos de Commit

Usa exclusivamente estos tipos para categorizar tus cambios:

| Etiqueta | Nombre Completo | Cuándo usarlo (Propósito) |
| :--- | :--- | :--- |
| **`feat`** | Feature | Cuando añades una **NUEVA funcionalidad** o característica al sistema. |
| **`fix`** | Fix | Cuando **CORRIGES un error** (*bug*) en el código. |
| **`refactor`** | Refactor | Cuando reescribes código para mejorarlo o limpiarlo **sin cambiar su funcionalidad** externa. |
| **`chore`** | Chore | Tareas de **mantenimiento**, configuración, scripts o actualización de dependencias. |
| **`docs`** | Documentation | Cambios que afectan **exclusivamente a la documentación** (README, comentarios). |
| **`test`** | Test | Cuando añades o corriges **pruebas** (unitarias, integración). |
| **`style`** | Style | Cambios de formato (espacios, comas, indentación) que no afectan la lógica del código. |
| **`perf`** | Performance | Cambios dedicados exclusivamente a mejorar el **rendimiento/velocidad**. |
| **`revert`** | Revert | Cuando deshaces (reviertes) un commit anterior. |

## 🚀 Arquitectura y Servicios

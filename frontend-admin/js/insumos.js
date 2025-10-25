// frontend-admin/js/inventory.js

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH GUARD ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return; // Detiene la ejecución del script si no hay token
    }

    const API_URL = 'http://localhost:8080/api';
    
    // Instancias de los Modales de Bootstrap
    const entradaLoteModal = new bootstrap.Modal(document.getElementById('entradaLoteModal'));
    const createInsumoModal = new bootstrap.Modal(document.getElementById('createInsumoModal'));
    const editInsumoModal = new bootstrap.Modal(document.getElementById('editInsumoModal')); // <-- NUEVO

    // --- EVENT LISTENERS ---
    document.getElementById('form-entrada-lote').addEventListener('submit', (event) => registrarEntrada(event, entradaLoteModal));
    document.getElementById('form-create-insumo').addEventListener('submit', (event) => crearNuevoInsumo(event, createInsumoModal));
    document.getElementById('form-edit-insumo').addEventListener('submit', (event) => updateInsumo(event, editInsumoModal)); // <-- NUEVO
    document.getElementById('logout-button').addEventListener('click', logout);
    document.getElementById('insumos-body').addEventListener('click', handleTableClick); // <-- NUEVO para delegación de eventos

    // --- INITIAL DATA LOAD ---
    loadInitialData();

    // --- API HELPERS ---
    async function apiRequest(endpoint, options = {}) {
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const config = { ...defaultOptions, ...options, headers: { ...defaultOptions.headers, ...options.headers } };

        const response = await fetch(`${API_URL}/${endpoint}`, config);

        if (response.status === 401) {
            logout();
            throw new Error('Sesión no autorizada.');
        }
        
        if (response.status === 204) return null;

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data.errors));
        }
        return data;
    }

    // --- NOTIFICATION ---
    function showNotification(message, type = 'success') {
        const notificationArea = document.getElementById('notification-area');
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        notificationArea.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    // --- APPLICATION LOGIC ---
    function loadInitialData() {
        cargarAlertas();
        cargarInsumosParaSelect();
        cargarTablaInventario();
    }

    async function cargarAlertas() { /* ... (sin cambios) ... */ }

    async function cargarTablaInventario() {
        const tbody = document.getElementById('insumos-body');
        tbody.innerHTML = '<tr><td colspan="5" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></td></tr>';
        try {
            const insumos = await apiRequest('insumos');
            tbody.innerHTML = '';
            if (insumos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5">No hay insumos registrados.</td></tr>';
                return;
            }
            insumos.forEach(insumo => {
                const stockTotal = insumo.lotes_sum_cantidad_restante !== null ? parseFloat(insumo.lotes_sum_cantidad_restante).toFixed(2) : '0.00';
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${insumo.id}</td>
                                <td>${insumo.nombre}</td>
                                <td>${insumo.stock_minimo_alerta} ${insumo.unidad_medida}</td>
                                <td>${stockTotal} ${insumo.unidad_medida}</td>
                                <td>
                                    <button class="btn btn-sm btn-warning btn-edit" data-id="${insumo.id}">Editar</button>
                                    <button class="btn btn-sm btn-danger btn-delete" data-id="${insumo.id}" data-nombre="${insumo.nombre}">Eliminar</button>
                                </td>`;
                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-danger">No se pudo cargar el inventario.</td></tr>`;
        }
    }

    async function cargarInsumosParaSelect(selectedId = null) {
        const select = document.getElementById('insumo-id');
        try {
            const insumos = await apiRequest('insumos');
            if (insumos.length > 0) {
                select.innerHTML = insumos.map(i => `<option value="${i.id}">${i.nombre}</option>`).join('');
                if (selectedId) {
                    select.value = selectedId;
                }
            } else {
                select.innerHTML = '<option disabled>Primero debe crear insumos</option>';
            }
        } catch (error) {
            select.innerHTML = '<option disabled>Error al cargar insumos</option>';
        }
    }

    async function registrarEntrada(event, modal) { /* ... (sin cambios) ... */ }

    async function crearNuevoInsumo(event, modal) {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Creando...';

        const data = {
            nombre: document.getElementById('new-insumo-nombre').value,
            unidad_medida: document.getElementById('new-insumo-unidad').value,
            stock_minimo_alerta: document.getElementById('new-insumo-minimo').value
        };

        try {
            const nuevoInsumo = await apiRequest('insumos', { method: 'POST', body: JSON.stringify(data) });
            modal.hide();
            form.reset();
            showNotification('¡Insumo creado con éxito!', 'success');
            await cargarInsumosParaSelect(nuevoInsumo.id);
            await cargarTablaInventario();
        } catch (error) {
            showNotification(`Error al crear insumo: ${error.message}`, 'danger');
        } finally {
            button.disabled = false;
            button.innerHTML = 'Crear Insumo';
        }
    }

    // --- NEW FUNCTIONS FOR EDIT AND DELETE ---
    function handleTableClick(event) {
        const target = event.target;
        const insumoId = target.dataset.id;

        if (target.classList.contains('btn-edit')) {
            handleEdit(insumoId);
        } else if (target.classList.contains('btn-delete')) {
            const insumoNombre = target.dataset.nombre;
            handleDelete(insumoId, insumoNombre);
        }
    }

    async function handleEdit(id) {
        try {
            const insumo = await apiRequest(`insumos/${id}`);
            document.getElementById('edit-insumo-id').value = insumo.id;
            document.getElementById('edit-insumo-nombre').value = insumo.nombre;
            document.getElementById('edit-insumo-unidad').value = insumo.unidad_medida;
            document.getElementById('edit-insumo-minimo').value = insumo.stock_minimo_alerta;
            editInsumoModal.show();
        } catch (error) {
            showNotification(`Error al cargar datos para editar: ${error.message}`, 'danger');
        }
    }

    async function handleDelete(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar el insumo "${nombre}"? Esta acción no se puede deshacer.`)) {
            try {
                await apiRequest(`insumos/${id}`, { method: 'DELETE' });
                showNotification('Insumo eliminado con éxito.', 'success');
                await loadInitialData(); // Recargar todos los datos
            } catch (error) {
                showNotification(`Error al eliminar insumo: ${error.message}`, 'danger');
            }
        }
    }

    async function updateInsumo(event, modal) {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('button[type="submit"]');
        const insumoId = document.getElementById('edit-insumo-id').value;

        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Guardando...';

        const data = {
            nombre: document.getElementById('edit-insumo-nombre').value,
            unidad_medida: document.getElementById('edit-insumo-unidad').value,
            stock_minimo_alerta: document.getElementById('edit-insumo-minimo').value
        };

        try {
            await apiRequest(`insumos/${insumoId}`, { method: 'PUT', body: JSON.stringify(data) });
            modal.hide();
            showNotification('¡Insumo actualizado con éxito!', 'success');
            await loadInitialData();
        } catch (error) {
            showNotification(`Error al actualizar insumo: ${error.message}`, 'danger');
        } finally {
            button.disabled = false;
            button.innerHTML = 'Guardar Cambios';
        }
    }

    function logout() {
        apiRequest('logout', { method: 'POST' })
            .catch(err => console.error("Error en el logout de la API, se procederá a limpiar localmente:", err))
            .finally(() => {
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            });
    }
    
    // Se re-incluyen las funciones que no cambiaron para que el archivo esté completo
    async function cargarAlertas() {
        const container = document.getElementById('alertas-container');
        container.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        try {
            const data = await apiRequest('stock/alertas');
            if (data.message || data.length === 0) {
                container.innerHTML = `<p>${data.message || 'No hay alertas de stock.'}</p>`;
            } else {
                container.innerHTML = '<ul class="list-group">' + data.map(a => `<li class="list-group-item list-group-item-warning"><b>${a.nombre}:</b> Quedan ${a.stock_actual} (Mínimo: ${a.stock_minimo_alerta})</li>`).join('') + '</ul>';
            }
        } catch (error) {
            container.innerHTML = `<p class="text-danger">No se pudieron cargar las alertas.</p>`;
        }
    }
    async function registrarEntrada(event, modal) {
        event.preventDefault();
        const form = event.target;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registrando...';

        const formData = new FormData(form);
        const data = {
            insumo_id: formData.get('insumo_id'),
            cantidad_inicial: formData.get('cantidad_inicial'),
            precio_compra_unitario: formData.get('precio_compra_unitario'),
            fecha_vencimiento: formData.get('fecha_vencimiento') || null,
            descripcion: formData.get('descripcion') || null
        };

        try {
            await apiRequest('lotes-insumos', { method: 'POST', body: JSON.stringify(data) });
            modal.hide();
            form.reset();
            showNotification('¡Entrada de lote registrada con éxito!', 'success');
            loadInitialData();
        } catch (error) {
            showNotification(`Error al registrar la entrada: ${error.message}`, 'danger');
        } finally {
            button.disabled = false;
            button.innerHTML = 'Registrar Entrada';
        }
    }
});
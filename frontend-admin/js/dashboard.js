// frontend-admin/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH GUARD ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const API_URL = 'http://localhost:8080/api';

    // --- DOM ELEMENTS ---
    const statProductos = document.getElementById('stat-productos');
    const statInsumos = document.getElementById('stat-insumos');
    const statAlertas = document.getElementById('stat-alertas');
    const alertasContainer = document.getElementById('alertas-container');
    const movimientosContainer = document.getElementById('movimientos-container');

    // --- EVENT LISTENERS ---
    document.getElementById('logout-button').addEventListener('click', logout);

    // --- API HELPERS ---
    async function apiRequest(endpoint, options = {}) {
        const defaultOptions = { headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json' } };
        const config = { ...defaultOptions, ...options, headers: { ...defaultOptions.headers, ...options.headers } };
        const response = await fetch(`${API_URL}/${endpoint}`, config);
        if (response.status === 401) { logout(); throw new Error('Sesión no autorizada.'); }
        if (response.status === 204) return null;
        const data = await response.json();
        if (!response.ok) { throw new Error(data.message || JSON.stringify(data.errors)); }
        return data;
    }

    // --- INITIALIZATION ---
    async function loadDashboardData() {
        try {
            const [productos, insumos, alertas, movimientos] = await Promise.all([
                apiRequest('productos'),
                apiRequest('insumos'),
                apiRequest('stock/alertas'),
                apiRequest('movimientos-inventario?limit=5') // Asumimos que la API puede limitar los resultados
            ]);

            renderStats(productos, insumos, alertas);
            renderAlertas(alertas);
            renderMovimientos(movimientos);

        } catch (error) {
            showNotification('No se pudo cargar la información del dashboard: ' + error.message, 'danger');
        }
    }

    // --- RENDER FUNCTIONS ---
    function renderStats(productos, insumos, alertas) {
        statProductos.textContent = productos ? productos.length : '0';
        statInsumos.textContent = insumos ? insumos.length : '0';
        statAlertas.textContent = (alertas && !alertas.message) ? alertas.length : '0';
    }

    function renderAlertas(alertas) {
        alertasContainer.innerHTML = '';
        if (!alertas || alertas.message || alertas.length === 0) {
            alertasContainer.innerHTML = `<div class="text-center"><p class="text-muted">No hay alertas de stock.</p></div>`;
            return;
        }
        const list = document.createElement('ul');
        list.className = 'list-group list-group-flush';
        alertas.forEach(alerta => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `
                <span>
                    <span class="fw-bold">${alerta.nombre}</span>
                    <br>
                    <small class="text-danger">Quedan: ${alerta.stock_actual} (Mín: ${alerta.stock_minimo_alerta})</small>
                </span>
                <a href="insumos.html" class="btn btn-sm btn-outline-primary">Gestionar</a>
            `;
            list.appendChild(item);
        });
        alertasContainer.appendChild(list);
    }

    function renderMovimientos(movimientos) {
        movimientosContainer.innerHTML = '';
        if (!movimientos || movimientos.length === 0) {
            movimientosContainer.innerHTML = `<div class="text-center"><p class="text-muted">No hay movimientos recientes.</p></div>`;
            return;
        }

        const table = document.createElement('table');
        table.className = 'table table-sm table-borderless';
        const tbody = document.createElement('tbody');

        movimientos.slice(0, 5).forEach(movimiento => { // Asegurarnos de mostrar solo los últimos 5
            const tr = document.createElement('tr');
            const fecha = new Date(movimiento.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
            
            const unidad = movimiento.lote_insumo.insumo.unidad_medida;
            let tipoBadge, cantidadText;
            if (movimiento.tipo_movimiento === 'entrada') {
                tipoBadge = '<span class="badge bg-success-soft text-success">Entrada</span>';
                cantidadText = `<span class="text-success">+${parseFloat(movimiento.cantidad).toFixed(2)} ${unidad}</span>`;
            } else {
                tipoBadge = '<span class="badge bg-danger-soft text-danger">Salida</span>';
                cantidadText = `<span class="text-danger">-${parseFloat(movimiento.cantidad).toFixed(2)} ${unidad}</span>`;
            }

            tr.innerHTML = `
                <td class="align-middle">${tipoBadge}</td>
                <td class="align-middle">
                    <span class="fw-bold">${movimiento.lote_insumo.insumo.nombre}</span>
                    <br>
                    <small class="text-muted">${fecha}</small>
                </td>
                <td class="text-end align-middle fw-bold">${cantidadText}</td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        movimientosContainer.appendChild(table);
    }

    // --- UTILITY FUNCTIONS ---
    function showNotification(message, type = 'success') {
        const notificationArea = document.getElementById('notification-area');
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        notificationArea.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    function logout() {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    }

    // --- KICKSTART ---
    loadDashboardData();
});

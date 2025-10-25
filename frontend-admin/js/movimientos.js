// frontend-admin/js/movimientos.js

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH GUARD ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const API_URL = 'http://localhost:8080/api';

    // --- DOM ELEMENTS ---
    const movimientosTableBody = document.getElementById('movimientos-body');

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
    async function loadMovimientos() {
        try {
            const movimientos = await apiRequest('movimientos-inventario');
            renderMovimientos(movimientos);
        } catch (error) {
            showNotification('No se pudieron cargar los movimientos: ' + error.message, 'danger');
        }
    }

    // --- RENDER FUNCTIONS ---
    function renderMovimientos(movimientos) {
        movimientosTableBody.innerHTML = '';
        if (!movimientos || movimientos.length === 0) {
            movimientosTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay movimientos registrados.</td></tr>';
            return;
        }

        movimientos.forEach(movimiento => {
            const tr = document.createElement('tr');
            // Formatear la fecha para que sea más legible
            const fecha = new Date(movimiento.created_at).toLocaleString('es-ES');
            
            // Lógica para mostrar el color según el tipo de movimiento
            let tipoBadge;
            switch (movimiento.tipo_movimiento) {
                case 'entrada':
                    tipoBadge = '<span class="badge bg-success">Entrada</span>';
                    break;
                case 'salida_venta':
                    tipoBadge = '<span class="badge bg-info">Venta</span>';
                    break;
                case 'salida_manual':
                    tipoBadge = '<span class="badge bg-warning text-dark">Salida Manual</span>';
                    break;
                default:
                    tipoBadge = `<span class="badge bg-secondary">${movimiento.tipo_movimiento}</span>`;
            }

            tr.innerHTML = `
                <td>${movimiento.id}</td>
                <td>${fecha}</td>
                <td>${movimiento.lote_insumo.insumo.nombre}</td>
                <td>Lote #${movimiento.lote_insumo.id}</td>
                <td>${tipoBadge}</td>
                <td>${parseFloat(movimiento.cantidad).toFixed(2)} ${movimiento.lote_insumo.insumo.unidad_medida}</td>
                <td>${movimiento.motivo || '<span class="text-muted">N/A</span>'}</td>
            `;
            movimientosTableBody.appendChild(tr);
        });
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
    loadMovimientos();
});

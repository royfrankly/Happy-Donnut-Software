// frontend-admin/js/categorias.js

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH GUARD ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const API_URL = 'http://localhost:8080/api';

    // --- MODAL INSTANCES ---
    const createCategoriaModal = new bootstrap.Modal(document.getElementById('createCategoriaModal'));
    const editCategoriaModal = new bootstrap.Modal(document.getElementById('editCategoriaModal'));

    // --- DOM ELEMENTS ---
    const createCategoriaButton = document.querySelector('button[data-bs-target="#createCategoriaModal"]');
    const categoriasTableBody = document.getElementById('categorias-body');
    const createForm = document.getElementById('form-create-categoria');
    const editForm = document.getElementById('form-edit-categoria');

    // --- EVENT LISTENERS ---
    document.getElementById('logout-button').addEventListener('click', logout);
    createCategoriaButton.addEventListener('click', () => createCategoriaModal.show());
    createForm.addEventListener('submit', handleCreateSubmit);
    editForm.addEventListener('submit', handleUpdateSubmit);
    categoriasTableBody.addEventListener('click', handleTableClick);

    // --- API HELPERS ---
    async function apiRequest(endpoint, options = {}) {
        const defaultOptions = { headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'Content-Type': 'application/json' } };
        const config = { ...defaultOptions, ...options, headers: { ...defaultOptions.headers, ...options.headers } };
        const response = await fetch(`${API_URL}/${endpoint}`, config);
        if (response.status === 401) { logout(); throw new Error('Sesión no autorizada.'); }
        if (response.status === 204) return null;
        const data = await response.json();
        if (!response.ok) { throw new Error(data.message || JSON.stringify(data.errors)); }
        return data;
    }

    // --- INITIALIZATION ---
    async function loadCategorias() {
        categoriasTableBody.innerHTML = '<tr><td colspan="4" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></td></tr>';
        try {
            const categorias = await apiRequest('categorias');
            renderCategorias(categorias);
        } catch (error) {
            showNotification('Error al cargar las categorías.', 'danger');
            categoriasTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">No se pudieron cargar las categorías.</td></tr>';
        }
    }

    // --- RENDER FUNCTION ---
    function renderCategorias(categorias) {
        categoriasTableBody.innerHTML = '';
        if (categorias.length === 0) {
            categoriasTableBody.innerHTML = '<tr><td colspan="4" class="text-center">No hay categorías registradas.</td></tr>';
            return;
        }
        categorias.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cat.id}</td>
                <td>${cat.nombre}</td>
                <td>${cat.descripcion || ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-edit" data-id="${cat.id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${cat.id}" data-nombre="${cat.nombre}">Eliminar</button>
                </td>
            `;
            categoriasTableBody.appendChild(tr);
        });
    }

    // --- CRUD HANDLERS ---
    async function handleCreateSubmit(event) {
        event.preventDefault();
        const button = createForm.querySelector('button[type="submit"]');
        button.disabled = true;
        const payload = {
            nombre: document.getElementById('categoria-nombre').value,
            descripcion: document.getElementById('categoria-descripcion').value
        };
        try {
            await apiRequest('categorias', { method: 'POST', body: JSON.stringify(payload) });
            createCategoriaModal.hide();
            createForm.reset();
            showNotification('Categoría creada con éxito.', 'success');
            loadCategorias();
        } catch (error) { showNotification(`Error: ${error.message}`, 'danger');
        } finally { button.disabled = false; }
    }

    async function handleUpdateSubmit(event) {
        event.preventDefault();
        const button = editForm.querySelector('button[type="submit"]');
        const id = document.getElementById('edit-categoria-id').value;
        button.disabled = true;
        const payload = {
            nombre: document.getElementById('edit-categoria-nombre').value,
            descripcion: document.getElementById('edit-categoria-descripcion').value
        };
        try {
            await apiRequest(`categorias/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
            editCategoriaModal.hide();
            showNotification('Categoría actualizada con éxito.', 'success');
            loadCategorias();
        } catch (error) { showNotification(`Error: ${error.message}`, 'danger');
        } finally { button.disabled = false; }
    }

    function handleTableClick(event) {
        const target = event.target;
        const id = target.dataset.id;
        if (target.classList.contains('btn-edit')) {
            handleEdit(id);
        } else if (target.classList.contains('btn-delete')) {
            handleDelete(id, target.dataset.nombre);
        }
    }

    async function handleEdit(id) {
        try {
            const categoria = await apiRequest(`categorias/${id}`);
            document.getElementById('edit-categoria-id').value = categoria.id;
            document.getElementById('edit-categoria-nombre').value = categoria.nombre;
            document.getElementById('edit-categoria-descripcion').value = categoria.descripcion || '';
            editCategoriaModal.show();
        } catch (error) {
            showNotification('No se pudieron cargar los datos de la categoría.', 'danger');
        }
    }

    async function handleDelete(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`)) {
            try {
                await apiRequest(`categorias/${id}`, { method: 'DELETE' });
                showNotification('Categoría eliminada con éxito.', 'success');
                loadCategorias();
            } catch (error) {
                showNotification(`Error: ${error.message}`, 'danger');
            }
        }
    }

    // --- UTILITY & LOGOUT ---
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
    loadCategorias();
});

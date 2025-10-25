// frontend-admin/js/productos.js

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH GUARD ---
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'login.html';
        return;
    }

    const API_URL = 'http://localhost:8080/api';

    // --- STATE ---
    let categorias = [];
    let insumos = [];
    let createReceta = [];
    let editReceta = [];

    // --- MODAL INSTANCES ---
    const createProductoModal = new bootstrap.Modal(document.getElementById('createProductoModal'));
    const editProductoModal = new bootstrap.Modal(document.getElementById('editProductoModal'));

    // --- DOM ELEMENTS ---
    const createProductButton = document.querySelector('button[data-bs-target="#createProductoModal"]');
    const productosTableBody = document.getElementById('productos-body');
    // Create Modal Elements
    const createForm = {
        form: document.getElementById('form-create-producto'),
        tipoSelect: document.getElementById('producto-tipo'),
        stockSection: document.getElementById('stock-section'),
        recetaSection: document.getElementById('receta-section'),
        addIngredienteButton: document.getElementById('btn-add-ingrediente'),
        listaIngredientesDiv: document.getElementById('lista-ingredientes')
    };
    // Edit Modal Elements
    const editForm = {
        form: document.getElementById('form-edit-producto'),
        idInput: document.getElementById('edit-producto-id'),
        tipoSelect: document.getElementById('edit-producto-tipo'),
        stockSection: document.getElementById('edit-stock-section'),
        recetaSection: document.getElementById('edit-receta-section'),
        addIngredienteButton: document.getElementById('btn-edit-add-ingrediente'),
        listaIngredientesDiv: document.getElementById('edit-lista-ingredientes')
    };

    // --- EVENT LISTENERS ---
    document.getElementById('logout-button').addEventListener('click', logout);
    createProductButton.addEventListener('click', () => createProductoModal.show());
    productosTableBody.addEventListener('click', handleTableClick);
    // Create Form Listeners
    createForm.tipoSelect.addEventListener('change', () => toggleProductTypeSections(createForm.tipoSelect, createForm.stockSection, createForm.recetaSection, () => renderReceta(createReceta, createForm.listaIngredientesDiv)));
    createForm.addIngredienteButton.addEventListener('click', () => addIngrediente(createReceta, 'receta-insumo', 'receta-cantidad', 'receta-unidad', () => renderReceta(createReceta, createForm.listaIngredientesDiv)));
    createForm.listaIngredientesDiv.addEventListener('click', (e) => handleRecetaClick(e, createReceta, () => renderReceta(createReceta, createForm.listaIngredientesDiv)));
    createForm.form.addEventListener('submit', handleCreateFormSubmit);
    // Edit Form Listeners
    editForm.tipoSelect.addEventListener('change', () => toggleProductTypeSections(editForm.tipoSelect, editForm.stockSection, editForm.recetaSection, () => renderReceta(editReceta, editForm.listaIngredientesDiv)));
    editForm.addIngredienteButton.addEventListener('click', () => addIngrediente(editReceta, 'edit-receta-insumo', 'edit-receta-cantidad', 'edit-receta-unidad', () => renderReceta(editReceta, editForm.listaIngredientesDiv)));
    editForm.listaIngredientesDiv.addEventListener('click', (e) => handleRecetaClick(e, editReceta, () => renderReceta(editReceta, editForm.listaIngredientesDiv)));
    editForm.form.addEventListener('submit', handleUpdateFormSubmit);


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
    async function loadInitialData() {
        try {
            const [productosData, categoriasData, insumosData] = await Promise.all([
                apiRequest('productos'),
                apiRequest('categorias'),
                apiRequest('insumos')
            ]);
            renderProducts(productosData);
            categorias = categoriasData;
            insumos = insumosData;
            populateSelect('producto-categoria', categorias, 'id', 'nombre');
            populateSelect('edit-producto-categoria', categorias, 'id', 'nombre');
            populateSelect('receta-insumo', insumos, 'id', 'nombre');
            populateSelect('edit-receta-insumo', insumos, 'id', 'nombre');
        } catch (error) {
            showNotification('No se pudieron cargar los datos iniciales.', 'danger');
        }
    }

    // --- RENDER FUNCTIONS ---
    function renderProducts(productos) {
        productosTableBody.innerHTML = '';
        if (productos.length === 0) {
            productosTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No hay productos registrados.</td></tr>';
            return;
        }
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            const stockDisplay = producto.tipo === 'reventa' ? (producto.stock || 0) : '<span class="text-muted">N/A</span>';
            tr.innerHTML = `<td>${producto.id}</td><td>${producto.nombre_producto}</td><td>${producto.categoria ? producto.categoria.nombre : 'Sin categoría'}</td><td><span class="badge bg-secondary">${producto.tipo}</span></td><td>S/ ${parseFloat(producto.precio_base).toFixed(2)}</td><td>${stockDisplay}</td><td><button class="btn btn-sm btn-warning btn-edit" data-id="${producto.id}">Editar</button> <button class="btn btn-sm btn-danger btn-delete" data-id="${producto.id}" data-nombre="${producto.nombre_producto}">Eliminar</button></td>`;
            productosTableBody.appendChild(tr);
        });
    }

    function renderReceta(recetaArray, containerDiv) {
        containerDiv.innerHTML = '';
        if (recetaArray.length === 0) {
            containerDiv.innerHTML = '<p class="text-muted small">Añada ingredientes a la receta.</p>';
            return;
        }
        const list = document.createElement('ul');
        list.className = 'list-group';
        recetaArray.forEach((ingrediente, index) => {
            const insumo = insumos.find(i => i.id == ingrediente.insumo_id);
            if (!insumo) return;
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            item.innerHTML = `<span>${insumo.nombre}</span><span class="badge bg-primary rounded-pill">${ingrediente.cantidad} ${insumo.unidad_medida}</span><button type="button" class="btn-close btn-remove-ingrediente" data-index="${index}" aria-label="Close"></button>`;
            list.appendChild(item);
        });
        containerDiv.appendChild(list);
    }

    // --- FORM & MODAL LOGIC ---
    function toggleProductTypeSections(tipoSelect, stockDiv, recetaDiv, renderFn) {
        const tipo = tipoSelect.value;
        stockDiv.classList.add('d-none');
        recetaDiv.classList.add('d-none');
        if (tipo === 'reventa') {
            stockDiv.classList.remove('d-none');
        } else if (tipo === 'preparado') {
            recetaDiv.classList.remove('d-none');
            if(renderFn) renderFn();
        }
    }

    function addIngrediente(recetaArray, insumoSelectId, cantidadInputId, unidadInputId, renderFn) {
        const insumoId = document.getElementById(insumoSelectId).value;
        const cantidad = parseFloat(document.getElementById(cantidadInputId).value);
        const unidad = document.getElementById(unidadInputId).value;

        if (!insumoId || !cantidad || cantidad <= 0) {
            showNotification('Debe seleccionar un insumo y una cantidad válida.', 'warning');
            return;
        }
        if (recetaArray.some(ing => ing.insumo_id == insumoId)) {
            showNotification('Ese ingrediente ya está en la receta.', 'warning');
            return;
        }

        const insumo = insumos.find(i => i.id == insumoId);
        if (!insumo) {
            showNotification('Insumo no encontrado.', 'danger');
            return;
        }

        try {
            const cantidadConvertida = convertirAUnidadBase(cantidad, unidad, insumo);
            recetaArray.push({ insumo_id: insumoId, cantidad: cantidadConvertida });
            renderFn();
            document.getElementById(cantidadInputId).value = '';
        } catch (error) {
            showNotification(error.message, 'danger');
        }
    }

    function handleRecetaClick(event, recetaArray, renderFn) {
        if (event.target.classList.contains('btn-remove-ingrediente')) {
            recetaArray.splice(event.target.dataset.index, 1);
            renderFn();
        }
    }

    async function handleCreateFormSubmit(event) {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Guardando...';
        const payload = {
            nombre_producto: document.getElementById('producto-nombre').value,
            precio_base: document.getElementById('producto-precio').value,
            descripcion: document.getElementById('producto-descripcion').value,
            categoria_id: document.getElementById('producto-categoria').value,
            tipo: document.getElementById('producto-tipo').value,
            stock: document.getElementById('producto-stock').value || null,
            receta: createReceta
        };
        try {
            await apiRequest('productos', { method: 'POST', body: JSON.stringify(payload) });
            createProductoModal.hide();
            event.target.reset();
            createReceta = [];
            toggleProductTypeSections(createForm.tipoSelect, createForm.stockSection, createForm.recetaSection, () => renderReceta(createReceta, createForm.listaIngredientesDiv));
            showNotification('¡Producto creado con éxito!', 'success');
            loadInitialData();
        } catch (error) { showNotification(`Error al crear el producto: ${error.message}`, 'danger');
        } finally { button.disabled = false; button.innerHTML = 'Guardar Producto'; }
    }

    async function handleUpdateFormSubmit(event) {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        const productId = editForm.idInput.value;
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Guardando...';
        const payload = {
            nombre_producto: document.getElementById('edit-producto-nombre').value,
            precio_base: document.getElementById('edit-producto-precio').value,
            descripcion: document.getElementById('edit-producto-descripcion').value,
            categoria_id: document.getElementById('edit-producto-categoria').value,
            tipo: document.getElementById('edit-producto-tipo').value,
            stock: document.getElementById('edit-producto-stock').value || null,
            receta: editReceta
        };
        try {
            await apiRequest(`productos/${productId}`, { method: 'PUT', body: JSON.stringify(payload) });
            editProductoModal.hide();
            showNotification('¡Producto actualizado con éxito!', 'success');
            loadInitialData();
        } catch (error) { showNotification(`Error al actualizar el producto: ${error.message}`, 'danger');
        } finally { button.disabled = false; button.innerHTML = 'Guardar Cambios'; }
    }

    function handleTableClick(event) {
        const target = event.target;
        const productId = target.dataset.id;
        if (target.classList.contains('btn-delete')) {
            handleDelete(productId, target.dataset.nombre);
        } else if (target.classList.contains('btn-edit')) {
            handleEdit(productId);
        }
    }

    async function handleEdit(id) {
        try {
            const producto = await apiRequest(`productos/${id}`);
            editForm.idInput.value = producto.id;
            document.getElementById('edit-producto-nombre').value = producto.nombre_producto;
            document.getElementById('edit-producto-precio').value = producto.precio_base;
            document.getElementById('edit-producto-descripcion').value = producto.descripcion;
            document.getElementById('edit-producto-categoria').value = producto.categoria_id;
            document.getElementById('edit-producto-tipo').value = producto.tipo;
            document.getElementById('edit-producto-stock').value = producto.stock || '';
            editReceta = producto.insumos.map(insumo => ({ insumo_id: insumo.id, cantidad: insumo.pivot.cantidad }));
            toggleProductTypeSections(editForm.tipoSelect, editForm.stockSection, editForm.recetaSection, () => renderReceta(editReceta, editForm.listaIngredientesDiv));
            editProductoModal.show();
        } catch (error) {
            showNotification(`Error al cargar el producto: ${error.message}`, 'danger');
        }
    }

    async function handleDelete(id, nombre) {
        if (confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
            try {
                await apiRequest(`productos/${id}`, { method: 'DELETE' });
                showNotification('Producto eliminado con éxito.', 'success');
                loadInitialData();
            } catch (error) {
                showNotification(`Error al eliminar el producto: ${error.message}`, 'danger');
            }
        }
    }

    // --- UTILITY FUNCTIONS ---
    function convertirAUnidadBase(cantidad, unidadEntrada, insumo) {
        const unidadBase = insumo.unidad_medida.toLowerCase();
        unidadEntrada = unidadEntrada.toLowerCase();

        if (unidadBase === unidadEntrada) {
            return cantidad;
        }

        // Conversiones de Masa
        if (unidadBase === 'kg' && unidadEntrada === 'g') return cantidad / 1000;
        if (unidadBase === 'g' && unidadEntrada === 'kg') return cantidad * 1000;

        // Conversiones de Volumen
        if (unidadBase === 'l' && unidadEntrada === 'ml') return cantidad / 1000;
        if (unidadBase === 'ml' && unidadEntrada === 'l') return cantidad * 1000;
        
        // Si no hay conversión válida (ej. kg a l, o unidad a kg), lanzar un error.
        throw new Error(`No se puede convertir de ${unidadEntrada} a ${unidadBase}.`);
    }

    function populateSelect(selectId, items, valueKey, textKey) {
        const select = document.getElementById(selectId);
        select.innerHTML = `<option value="" disabled selected>Seleccione una opción</option>`;
        if (!items) return;
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueKey];
            option.textContent = item[textKey];
            select.appendChild(option);
        });
    }

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
    loadInitialData();
});

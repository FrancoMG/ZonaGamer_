
/////////// DIVS PRODUCTOS DE LA PAGINA PRODUCTOS //////////
document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        {div: 'proce', modal: 'modalProce'},
        {div: 'mother', modal: 'modalMother'},
        {div: 'placa', modal: 'modalPlaca'},
        {div: 'fuente', modal: 'modalFuente'},
        {div: 'ram', modal: 'modalRAM'},
        {div: 'ssd', modal: 'modalSSD'}
    ];

    productos.forEach(function(item) {
        const div = document.getElementById(item.div);
        const modal = document.getElementById(item.modal);
        if (div && modal) {
            div.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') return;
                new bootstrap.Modal(modal).show();
            });
        }
    });
});



////////// AGREGAR PRODUCTOS AL CARRITO //////////
document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        {div: 'proce', modal: 'modalProce', nombre: 'Procesador AMD Ryzen 7 9700X', precio: 450000, img: './img/9700x.jpg'},
        {div: 'mother', modal: 'modalMother', nombre: 'Motherboard Asus Rog Strix X870E-E', precio: 760000, img: 'img/X870-e.png'},
        {div: 'placa', modal: 'modalPlaca', nombre: 'Placa de Video NVIDIA RTX 5080', precio: 2000000, img: 'img/5080.jpg'},
        {div: 'fuente', modal: 'modalFuente', nombre: 'Fuente de Poder Corsair 850W', precio: 140000, img: 'img/Fuente.png'},
        {div: 'ram', modal: 'modalRAM', nombre: 'Memoria Ram Corsair 32gb', precio: 246000, img: 'img/Dominator-Titanium.png'},
        {div: 'ssd', modal: 'modalSSD', nombre: 'SSD M.2 NVME WD_BLACK 2TB', precio: 139000, img: 'img/M.2.png'}
    ];

    productos.forEach(function(item) {
        const div = document.getElementById(item.div);
        const modal = document.getElementById(item.modal);
        if (div && modal) {
            div.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') return;
                new bootstrap.Modal(modal).show();
            });
        }
        // Agregar al carrito
        if (div) {
            const btn = div.querySelector('button');
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    agregarAlCarrito(item);
                });
            }
        }
    });

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(p => p.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarMensajeCarrito('Producto agregado al carrito');
}

    function actualizarContadorCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let contador = document.getElementById('contador-carrito');
        if (contador) {
            if (carrito.length === 0) {
                contador.style.display = 'none'; // Oculta el contador si está vacío
            } else {
                contador.style.display = 'inline'; // Muestra el contador si hay productos
                contador.textContent = carrito.length;
            }
        }
    }

    // Inicializa el contador al cargar la página
    actualizarContadorCarrito();
});



////////// DISEÑO DEL CARRITO //////////
document.addEventListener('DOMContentLoaded', function() {
    const tabla = document.getElementById('productos-carrito');
    const vacio = document.getElementById('carrito-vacio');
    const totalDiv = document.getElementById('carrito-total');
    if (tabla && vacio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        tabla.innerHTML = '';
        let total = 0;
        if (carrito.length === 0) {
            vacio.style.display = 'block';
            if (totalDiv) totalDiv.textContent = '';
                document.getElementById('carrito-header').style.display = 'none';
                document.getElementById('carrito-tabla').style.display = 'none';
                document.getElementById('carrito-total-row').style.display = 'none';
        } else {
            vacio.style.display = 'none';
            document.getElementById('carrito-header').style.display = '';
            document.getElementById('carrito-tabla').style.display = '';
            document.getElementById('carrito-total-row').style.display = '';
            carrito.forEach(function(producto, i) {
                if (!producto.cantidad) producto.cantidad = 1;
                const subtotal = producto.precio * producto.cantidad;
                total += subtotal;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="align-middle">
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${producto.img}" alt="${producto.nombre}" style="width:70px; height:auto; border-radius:10px;">
                            <span style="font-weight:600;font-family: 'GTA Regular';">${producto.nombre}</span>
                        </div>
                    </td>
                    <td class="align-middle">
                        <input type="number" min="1" value="${producto.cantidad}" data-indice="${i}" class="form-control cantidad-carrito" style="width:70px;font-family: 'GTA Regular';">
                    </td>
                    <td class="align-middle" style="font-family:'GTA Regular';">$${subtotal.toLocaleString()}</td>
                    <td class="align-middle">
                        <button class="btn btn-danger btn-sm eliminar-carrito" data-indice="${i}">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(tr);
            });

            // Quita la fila de total de la tabla
            // Actualiza el total fuera de la tabla
            const totalNombre = document.querySelector('.col-total-nombre');
            const totalPrecio = document.getElementById('carrito-total-precio');
            if (totalNombre && totalPrecio) {
                totalNombre.textContent = 'TOTAL';
                totalPrecio.textContent = `$${total.toLocaleString()}`;
            }
        }

        // Cambiar cantidad
        tabla.addEventListener('change', function(e) {
            if (e.target.classList.contains('cantidad-carrito')) {
                const indice = e.target.getAttribute('data-indice');
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito[indice].cantidad = parseInt(e.target.value) || 1;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                location.reload();
            }
        });

        // Eliminar producto
        tabla.addEventListener('click', function(e) {
            if (e.target.classList.contains('eliminar-carrito')) {
                const indice = e.target.getAttribute('data-indice');
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito.splice(indice, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                location.reload();
            }
        });
            const btnVaciar = document.getElementById('vaciar-carrito');
        if (btnVaciar) {
            if (carrito.length > 1) {
                btnVaciar.style.display = '';
            } else {
                btnVaciar.style.display = 'none';
            }
            btnVaciar.addEventListener('click', function() {
            localStorage.removeItem('carrito');
            location.reload();
            });
        }
    }
});
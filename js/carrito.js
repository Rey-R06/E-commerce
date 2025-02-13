const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-el-carrito"));

const productosCarritoHtml = document.getElementById("productosCarrito");
const accionesCarrito = document.getElementById("accionesCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const totalHtml = document.getElementById("total");
let basura = document.querySelectorAll(".basura");
const BotonVaciarCarrito = document.getElementById("vaciarCarrito")
const buttonComprar = document.getElementById("buttonComprar")

function cargarProductosCarrito() {
    if (productosEnCarrito.length != 0) {
        carritoVacio.classList.add("invisible")
        accionesCarrito.classList.remove("invisible");
        let totalApagar = 0;
        

        productosEnCarrito.forEach(productos => {
            const div = document.createElement("div");
            div.classList.add("card-Carrito")
            totalApagar += productos.precio * productos.cantidad;
            totalHtml.innerHTML = `$${totalApagar}`;

            div.innerHTML =
            ` 
                <img src="${productos.imagen}" width="150">
                <div class="titulo">
                    <small>titulo</small>
                    <p><strong>${productos.titulo}</strong></p>
                </div>
                <div class="cantidad">
                    <small>cantidad</small>
                    <p>${productos.cantidad}</p>
                </div>
                <div class="precio">
                    <small>precio</small>
                    <p>${productos.precio}</p>
                </div>
                <div class="subtotal">
                    <small>subtotal</small>
                    <p>$${productos.precio * productos.cantidad}</p>
                </div>
                <button class="basura" id="${productos.id}">
                    <img src="/multimedia/iconos/basura.png" alt="canasta de basura" width="30">
                </button>
            ` 
            productosCarritoHtml.append(div);
        });
    }else{
        carritoVacio.innerText = "Carrito vacio, al algunas compras.";
    }
   actualizarBotonesEliminar();
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".basura")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    let productoEliminarIndex = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(productoEliminarIndex, 1);

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito))

    const carrito = JSON.parse(localStorage.getItem("productos-en-el-carrito")) || [];

    if (carrito.length === 0) {
        location.reload();
        accionesCarrito.classList.add("invisible");
    }

    productosCarritoHtml.innerHTML = "";
    cargarProductosCarrito();
}

BotonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito));
    location.reload();
}

buttonComprar.addEventListener("click", comprar);

function comprar() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito));
    
    productosCarritoHtml.innerHTML = "";
    accionesCarrito.classList.add("invisible");
    productosCarritoHtml.innerHTML = "<p>GRACIAS POR TU COMPRA</p>"; // Muestra el mensaje

    setTimeout(() => {
        location.reload(); // Recarga la página después de 2 segundos
    }, 2000);
}
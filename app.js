document.addEventListener("DOMContentLoaded", () => {

  const carritoGuardado = JSON.parse(localStorage.getItem("productos")) || [];

  const data = {
    "productos": [
      {
        "nombre": "Detergente para ropa",
        "precio": 1500.0,
        "disponibilidad": "En stock",
        "id": 1
      },
      {
        "nombre": "Limpiador multiusos",
        "precio": 800.0,
        "disponibilidad": "En stock",
        "id": 2
      },
      {
        "nombre": "Limpiador de vidrios",
        "precio": 500.0,
        "disponibilidad": "En stock",
        "id": 3
      },
      {
        "nombre": "Desengrasante para cocina",
        "precio": 500.0,
        "disponibilidad": "En stock",
        "id": 4
      },
      {
        "nombre": "Jabón líquido para manos",
        "precio": 1000.0,
        "disponibilidad": "En stock",
        "id": 5
      }
    ]
  };

// Productos
const listaProductos = document.getElementById("lista-productos");
data.productos.forEach(producto => {
  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = ` ${producto.nombre} - $${producto.precio}`;
  btnAgregar.addEventListener("click", () => {
    Toastify({
      text: "Producto agregado al carrito",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
    agregarAlCarrito(producto);
    actualizarProductosSeleccionados();
  });
  listaProductos.appendChild(btnAgregar);
});

  // carrito
  let carrito = {};

  // Cantidad de productos
  let totalProductos = 0;

  // Agregar un producto al carrito
  function agregarAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    if (carrito[producto.nombre]) {
      carrito[producto.nombre].cantidad += 1;
    } else {
      carrito[producto.nombre] = {
        cantidad: 1,
        precio: producto.precio
      };
    }
    // Aumentar el contador de productos seleccionados
    totalProductos++;
  }

  // Eliminar un producto del carrito
  function eliminarDelCarrito(producto) {
    if (carrito[producto.nombre]) {
      carrito[producto.nombre].cantidad -= 1;

      if (carrito[producto.nombre].cantidad === 0) {
        delete carrito[producto.nombre];
      }

      // Reducir el contador de productos seleccionados
      totalProductos--;

      // Actualizar la sección de productos seleccionados
      actualizarProductosSeleccionados();
    }
  }

  function actualizarProductosSeleccionados() {
    const productosSeleccionados = document.getElementById("productos-seleccionados");
    productosSeleccionados.innerHTML = "";

// Productos seleccionados
for (const [nombre, producto] of Object.entries(carrito)) {
  const itemProducto = document.createElement("div");
  itemProducto.textContent = `${nombre} x ${producto.cantidad} = $${producto.cantidad * producto.precio}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.setAttribute("data-producto", nombre);

  btnEliminar.addEventListener("click", () => {
    const nombreProducto = btnEliminar.getAttribute("data-producto");
    const productoEliminar = data.productos.find(p => p.nombre === nombreProducto);
    eliminarDelCarrito(productoEliminar);
  });

  itemProducto.appendChild(btnEliminar);
  productosSeleccionados.appendChild(itemProducto);
}

    // Total productos y precio
    const totalProductosSeleccionados = document.getElementById("total-productos-seleccionados");
    totalProductosSeleccionados.textContent = `Total de productos seleccionados: ${totalProductos}`;
    const precioTotal = document.getElementById("precio-total");
    precioTotal.textContent = `Precio total del carrito: $${calcularPrecioTotal()}`;
  }

  // Precio total del carrito
  function calcularPrecioTotal() {
    let total = 0;
    for (const producto of Object.values(carrito)) {
      total += producto.cantidad * producto.precio;
    }
    return total.toFixed(2);
  }

  // INPUT FORM

  const inputName = document.querySelector("#inputName")

  console.log(inputName)

  inputName.addEventListener("keydown", () => {
    console.log("Escribiendo...")
  })

  const formulario = document.querySelector("#formulario")

  const nombre = document.querySelector("#inputName")
  const correo = document.querySelector("#inputEmail")

  formulario.addEventListener("submit", validarFormulario)

  function validarFormulario(e) {
    e.preventDefault()
    console.log(`Nombre: ${nombre.value}`)
    console.log(`Correo: ${correo.value}`)
  }

  const lista = document.querySelector("#listado")

  fetch("/api.json")
  .then((r) => r.json())
  .then((d) => {
    d.forEach((producto) => {
      const li = document.createElement("li")
      li.innerHTML = `
      <h5> ${producto.nombre} </h5>
      <p> ${producto.precio} </p>
      `
      lista.append(li)
    })
  })

});
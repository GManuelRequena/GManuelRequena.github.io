// Vars
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Eliminar un curso presionando X
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar carrito de compras
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoEliminarId = e.target.getAttribute("data-id");

    //Elimina del arreglo
    articulosCarrito = articulosCarrito.filter(
      (curso) => curso.id !== cursoEliminarId
    );

    carritoHTML();
  }
}

function vaciarCarrito() {
  articulosCarrito = [];
  limpiarHTML();
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //Crear un objeto con el contenido del curso actual
  const infoCurso = {
    image: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si existe un curso
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  console.log(existe);
  if (existe) {
    //Actualizamos cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objeto actualizado
      } else {
        return curso; //Retorna los objectos no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agrego en el carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { image, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${image}" width="100">
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

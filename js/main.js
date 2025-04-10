const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Numeracion de la primera columna de la tabla
let cont = 0;
let constoTotal = 0;
let totalEnProductos = 0;

const validarCantidad = () => {
  if (txtNumber.value.trim().length <= 0) {
    return false;
  } // length <= 0

  // validar si es numero:
  if (isNaN(txtNumber.value)) {
    return false;
  } // isNaN

  // validar numero mayor que 0:
  if (Number(txtNumber.value) <= 0) {
    return false;
  }

  return true;
}; // validar cantidad

const traerPrecio = () => {
  return Math.round(Math.random() * 10000) / 100;
}; // traer precio aleatorio

btnAgregar.addEventListener("click", (event) => {
  event.preventDefault();

  // Bandera, al ser true permite agregar los datos a la tabla
  let isValid = true;

  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtName.style.border = "";
  txtNumber.style.border = "";

  txtName.value = txtName.value.trim();
  txtNumber.value = txtNumber.value.trim();

  if (txtName.value.length < 3) {
    txtName.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML =
      "<strong>El nombre del producto es incorrecto</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } // length >= 3 validar agregar producto

  if (!validarCantidad()) {
    txtNumber.style.border = "solid medium red";
    alertValidacionesTexto.innerHTML +=
      "<br/><strong>La cantidad del producto no es correcta</strong>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } // validar agregar cantidad

  if (isValid) {
    // Si paso las valicaciones, agregar...
    cont++;
    let precio = traerPrecio();
    let row = `
    <tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
    </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    constoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$" + constoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  } // if isValid
});

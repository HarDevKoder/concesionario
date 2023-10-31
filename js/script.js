// ----------------------------------------------------------------------------------------
// Referencia de elementos del DOM
// ----------------------------------------------------------------------------------------
const btnRegistrar = document.getElementById("btnRegistrar");
const btnMostrar = document.getElementById("btnMostrar");
const spanResultados = document.getElementById("spanResultados");

// ----------------------------------------------------------------------------------------
// Variables Globales
// ----------------------------------------------------------------------------------------
let codigo = 0;
let arrayAutos = [];
let autoRegistrado;

// ----------------------------------------------------------------------------------------
// Funciones
// ----------------------------------------------------------------------------------------

// Funcion que extrae el valor de los inputs y los guarda en un Array
const extraerValoresInputs = () => {
  const inputs = document.querySelectorAll(".datosFormulario");
  const arrayDatos = [];
  inputs.forEach((input) => {
    let valor = input.value;
    arrayDatos.push(valor);
  });
  return arrayDatos;
};

// Funcion Constructora de Objetos (Propiedades Automoviles)
function Auto(codigo, marca, modelo, color, anio, titular) {
  this.codigo = codigo;
  this.marca = marca;
  this.modelo = modelo;
  this.color = color;
  this.anio = anio;
  this.titular = titular;
}

// Método para vender el Auto (cambiar el titular)
Auto.prototype.venderAuto = function (auto, titular) {
  auto.titular = titular;
};

// Método para encender el Auto
Auto.prototype.encender = function (auto) {
  alert(`El Auto ${auto} está  en marcha`);
};

// Función para instanciar Autos
const instanciarAuto = (codigo, marca, modelo, color, anio, titular) => {
  let auto = new Auto(codigo, marca, modelo, color, anio, titular);
  return auto;
};

// Funcion que crea la tarjeta y le inserta la información de los autos registrados
const mostrarDatosEnTarjeta = () => {
  // Formato para mostrar datos
  arrayAutos.forEach((auto) => {
    let elemento = "";
    elemento = `
    Marca: ${auto.marca}\n
    Modelo: ${auto.modelo}\n
    Color: ${auto.color}\n
    Año: ${auto.anio}\n
    Titular: ${auto.titular}
    `;

    // Creo Tarjeta y le asigno clase CSS
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    // Creo div para mostrar icono de auto en la tarjeta
    const cajaImagenTarjeta = document.createElement("div");
    cajaImagenTarjeta.classList.add("cajaImagenTarjeta");
    cajaImagenTarjeta.classList.add("icon-car");

    // Creo div para Mostrar los Datos del auto
    const cajaDatosTarjeta = document.createElement("div");
    cajaDatosTarjeta.classList.add("cajaDatosTarjeta");

    // Imprimo los datos del auto en la tarjeta en varias lineas
    cajaDatosTarjeta.innerHTML = elemento;
    cajaDatosTarjeta.style.whiteSpace = "pre-line";

    // Agrego elementos creados y su contenido a sus padres
    spanResultados.appendChild(tarjeta);
    tarjeta.append(cajaImagenTarjeta, cajaDatosTarjeta);
  });
};

// ----------------------------------------------------------------------------------------
// Programa Principal
// ----------------------------------------------------------------------------------------

// Botón Registrar Autos
btnRegistrar.addEventListener("click", () => {
  // Incremento el codigo del auto para llevar consecutivo
  codigo++;

  // Extraigo los valores ingresados en el formulario (desestructuracion)
  [marca, modelo, color, anio, titular] = extraerValoresInputs();

  // Instancio el auto a registrar
  autoRegistrado = instanciarAuto(codigo, marca, modelo, color, anio, titular);

  // Agrego la instancia al array de autos
  arrayAutos.push(autoRegistrado);

  // Limpio inputs para nuevos ingresos
  document
    .querySelectorAll('input[type="text"]')
    .forEach((input) => (input.value = ""));
});

// Botón Mostrar Resultados en tarjetas
btnMostrar.addEventListener("click", () => {
  if (btnMostrar.textContent === "Mostrar") {
    spanResultados.style.visibility = "visible";
    btnMostrar.textContent = "Ocultar";
    spanResultados.innerHTML = "";
    mostrarDatosEnTarjeta();
  } else {
    btnMostrar.textContent = "Mostrar";
    spanResultados.style.visibility = "hidden";
  }
});

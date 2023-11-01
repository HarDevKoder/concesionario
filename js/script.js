// ----------------------------------------------------------------------------------------
// Referencia de elementos del DOM
// ----------------------------------------------------------------------------------------
const btnRegistrar = document.getElementById("btnRegistrar");
const btnMostrar = document.getElementById("btnMostrar");
const btnVenderAuto = document.getElementById("btnVenderAuto");
const spanResultados = document.getElementById("spanResultados");

// ----------------------------------------------------------------------------------------
// Variables Globales
// ----------------------------------------------------------------------------------------
let codigo = 0;
let arrayAutos = [];
let autoRegistrado;
let valoresInputsArr = [];

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
Auto.prototype.venderAuto = function (nuevoTitular) {
  this.titular = nuevoTitular;
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
    Codigo: ${auto.codigo}\n
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

// Función que Realiza validaciones de los inputs
const validarInputs = (valoresInputsArr) => {
  let datosValidos = false;
  // valido inputs vacios
  if (valoresInputsArr.some(input => input === '')) {
    alert('llena todos los campos!');
  } else {
    // Extraigo el año de los datos ingresados
    let anio = valoresInputsArr.splice(3, 1)[0];

    // Elimino el modelo del array para que no sea validado
    valoresInputsArr.splice(1, 1);

    // Evaluo los inputs de text para evitar ingresos numericos
    let regex = /[\d]/g;
    if (valoresInputsArr.some(input => regex.test(input))) {
      alert('No se aceptan Datos Numéricos!');
    } else {
      // Valido campo numerico(anio)
      let regex = /^[0-9]*$/;
      if (regex.test(anio)) {
        alert("Datos registrados exitosamente!");
        datosValidos = true;
      } else {
        alert("Año debe ser numérico!");
      }
    }
  }
  return datosValidos;
}
// ----------------------------------------------------------------------------------------
// Programa Principal
// ----------------------------------------------------------------------------------------

// Botón Registrar Autos
btnRegistrar.addEventListener("click", () => {
  // Extraigo los valores ingresados en el formulario (desestructuracion)
  [marca, modelo, color, anio, titular] = extraerValoresInputs();

  // Variable que guarda el estado de las validaciones
  let respuestaValidación;

  // Obtengo array con los valores de los inputs a validar
  valoresInputsArr = extraerValoresInputs();

  // Valido datos ingresados
  respuestaValidación = validarInputs(valoresInputsArr);

  // Acciones si pasa la validación
  if (respuestaValidación) {

    // Incremento el codigo del auto para llevar consecutivo
    codigo++;

    // Instancio el auto a registrar
    autoRegistrado = instanciarAuto(codigo, marca, modelo, color, anio, titular);

    // Agrego la instancia al array de autos
    arrayAutos.push(autoRegistrado);

    // Limpio inputs para nuevos ingresos
    document
      .querySelectorAll('input[type="text"]')
      .forEach((input) => (input.value = ""));
  }
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

// Boton para vender un auto
btnVenderAuto.addEventListener('click', () => {
  let posicion = Number(prompt('Ingresa Código del Auto a vender:'));
  let nuevoTitular = prompt('Ingresa Nombre del nuevo titular:');
  arrayAutos[posicion - 1].venderAuto(nuevoTitular);
  alert('Venta Realizada!');
})

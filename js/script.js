// ----------------------------------------------------------------------------------------
// Referencia de elementos del DOM
// ----------------------------------------------------------------------------------------
const btnRegistrar = document.getElementById('btnRegistrar');
const btnMostrar = document.getElementById('btnMostrar');

// ----------------------------------------------------------------------------------------
// Variables Globales
// ----------------------------------------------------------------------------------------
let codigo = 0;
let arrayAutos = [];
let autoRegistrado;

// ----------------------------------------------------------------------------------------
// Funciones
// ----------------------------------------------------------------------------------------
// Funcion que crea la tarjeta que muestra datos del auto
const crearTarjetaDatos = () => {
  const spanResultados = document.getElementById('spanResultados');

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('tarjeta');
  
  const cajaImagenTarjeta = document.createElement('div');
  cajaImagenTarjeta.classList.add('cajaImagenTarjeta');
  cajaImagenTarjeta.classList.add('icon-car');
  
  
  const cajaDatosTarjeta = document.createElement('div');
  cajaDatosTarjeta.classList.add('cajaDatosTarjeta');


  spanResultados.appendChild(tarjeta);
  tarjeta.append(cajaImagenTarjeta,cajaDatosTarjeta);
}

// Funcion que extrae el valor de los inputs y los guarda en un Array
const extraerValoresInputs = () => {
  const inputs = document.querySelectorAll('.datosFormulario');
  const arrayDatos = [];
  inputs.forEach((input) => {
    let valor = input.value;
    arrayDatos.push(valor);
  });
  return arrayDatos;
}

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
}

// Método para encender el Auto
Auto.prototype.encender = function (auto) {
  alert(`El Auto ${auto} está  en marcha`);
}

// Función para instanciar Autos
const instanciarAuto = (codigo, marca, modelo, color, anio, titular) => {
  let auto = new Auto(codigo, marca, modelo, color, anio, titular);
  return auto;
}

// ----------------------------------------------------------------------------------------
// Programa Principal
// ----------------------------------------------------------------------------------------
btnRegistrar.addEventListener('click', () => {
  // elemento del array de autos (auto instanciado)
  let elemento='';

  // Incremento el codigo del auto para llevar consecutivo
  codigo++;

  // Extraigo los valores ingresados en el formulario (desestructuracion)
  [marca, modelo, color, anio, titular] = extraerValoresInputs();

  // Instancio el auto a registrar
  autoRegistrado = instanciarAuto(codigo, marca, modelo, color, anio, titular);

  // Agrego la instancia al array de autos
  arrayAutos.push(autoRegistrado);

  // guardo en variable los autos registrados
  arrayAutos.forEach((auto) => {
    elemento += `Codigo: ${auto.codigo}
    Marca: ${auto.marca}
    Modelo: ${auto.modelo}
    Color: ${auto.color}
    Año: ${auto.anio}
    Titular: ${auto.titular}
    \n`;
    // div.innerHTML = elemento;
  });

  // Muestro los autos registrados
  alert(elemento)

});

btnMostrar.addEventListener('click', () => {
  for (let i = 1; i <= 4; i++) {
    crearTarjetaDatos();
  }
});


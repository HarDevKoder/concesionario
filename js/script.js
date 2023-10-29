// ----------------------------------------------------------------------------------------
// Referencia de elementos del DOM
// ----------------------------------------------------------------------------------------
  

// ----------------------------------------------------------------------------------------
// Variables Globales
// ----------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------
// Funciones
// ----------------------------------------------------------------------------------------
// Funcion que crea la tarjeta que muestra datos del auto
const tarjetaDatosAuto = () =>{
  const spanResultados = document.getElementById('spanResultados');
  const tarjeta = document.createElement('div');
  tarjeta.style.width = '200px';
  tarjeta.style.height = '200px';
  tarjeta.style.background = 'transparent';
  tarjeta.style.border = '1px solid silver';
  spanResultados.appendChild(tarjeta);
}

// ----------------------------------------------------------------------------------------
// Programa Principal
// ----------------------------------------------------------------------------------------
for(let i=1;i<=3;i++){

  tarjetaDatosAuto();
}
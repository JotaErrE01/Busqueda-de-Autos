import '../index.html';
import '../css/app.css';
import '../css/normalize.css';
import '../css/skeleton.css';
import { autos } from './db.js';

//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');

const resultado = document.querySelector('#resultado');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

//generar objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    color: '',
    transmision: ''
}

//funciones
function mostrarAutos(autos){
    limpiarHtm();
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `
        ${marca} ${modelo} - Año: ${year} - Puertas: ${puertas} - 
        Transmición: ${transmision} - Precio: $${precio} - Color: ${color}
        `;

        //insertar en el html
        resultado.appendChild(autoHtml);
    });
}

function limpiarHtm(){
    while(resultado.firstChild){
        resultado.firstChild.remove();
    }
}

//genear Años
function generarYears(){
    for(let i = maxYear; i >= minYear; i--){
        const optYear = document.createElement('option');
        optYear.value = i;
        optYear.textContent = i;
        year.appendChild(optYear);
    }
}

function llenarObjeto(e){
    for(const key in datosBusqueda){
        if(key === e.target.id){
            datosBusqueda[key] = e.target.value;
        }
    }
    filtrar();
}

function filtrar(){
    const response = autos.filter(filtrarMarca)
                          .filter(filtrarYear)
                          .filter(filtrarMin)
                          .filter(filtrarMax)
                          .filter(filtrarPuertas)
                          .filter(filtrarColor)
                          .filter(filtrarTransmision);

    if(response.length ){
        mostrarAutos(response);
    }else{
        //mensaje de no resultados
        mensajeError();
    }
}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMin(auto){
    const { minimo } = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}

function filtrarMax(auto){
    const { maximo } = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function mensajeError(){
    limpiarHtm();
    const error = document.createElement('p');
    error.textContent = 'No se Encontraron Resultados';
    error.classList.add('alerta', 'error');
    resultado.appendChild(error);
}

//Eventos
function eventListeners(){
    document.addEventListener('DOMContentLoaded', _ => {
        mostrarAutos(autos);
        generarYears();
    });

    const arreglo = [marca, year, precioMin, precioMax, puertas, color, transmision];
    arreglo.forEach(element => {
        element.addEventListener('change', llenarObjeto);
    });
    // marca.addEventListener('change', llenarObjeto);
    // year.addEventListener('change', llenarObjeto); 
    // precioMin.addEventListener('change', llenarObjeto); 
    // precioMax.addEventListener('change', llenarObjeto); 
}

eventListeners();
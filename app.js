"use strict";

const tablero = document.querySelector(".contenedor");
const botonInicio = document.getElementById("inicio");
let cartas = [];
let seleccion = [];
let parejasEncontradas = 0;
let contadorNivel = document.getElementById("nivel");
let intentos = document.getElementById("intentos");
let contadorIntentos = 0;
let nivel = 1;
const maxNivel = 5;

const nivelCartas = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 18
};

function iniciarJuego() {
    tablero.classList.add(`contenedor${nivel}`)
    cartas = [];
    seleccion = [];
    parejasEncontradas = 0;
    tablero.innerHTML = "";

    const numeros = generarNumeros(nivelCartas[nivel]);

    for (let i = 0; i < nivelCartas[nivel]; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-oculta");
        tarjeta.setAttribute("id", "tarjeta-" + i);
        tarjeta.addEventListener("click", voltear);
        tarjeta.dataset.numero = numeros[i]; 
        tablero.appendChild(tarjeta);
        cartas.push(tarjeta);
    }
}

function voltear() {
    if (this.classList.contains("tarjeta-oculta") && seleccion.length < 2) {
        this.classList.remove("tarjeta-oculta");
        this.classList.add("tarjeta-visible");
        this.style.backgroundImage = `url(images/${this.dataset.numero}.png)`;
        seleccion.push(this);

        if (seleccion.length === 2) {
            setTimeout(comparar, 1000);
        }
    }
}

function generarNumeros(cantidad) {
    const numeros = [];
    const pares = cantidad / 2;
    for (let i = 1; i <= pares; i++) {
        numeros.push(i, i);
    }

    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
    return numeros;
}

function comparar() {
    contadorIntentos ++;
    intentos.innerText = `Intentos: ${contadorIntentos}`
    const [primera, segunda] = seleccion;

    if (primera.dataset.numero === segunda.dataset.numero) {
        primera.removeEventListener("click", voltear);
        segunda.removeEventListener("click", voltear);
        parejasEncontradas++;

        if (parejasEncontradas === cartas.length / 2) {
            if (nivel < maxNivel) {
                setTimeout(() => {
                    nivel++;
                    contadorNivel.innerText = `Nivel: ${nivel}`
                    tablero.classList.remove(`contenedor${nivel}`)
                    tablero.classList.add(`contenedor${nivel}`)
                    iniciarJuego();
                }, 500);
            } else {
                setTimeout(() => {
                    alert("Enhorabuena, has completado todos los niveles!");
                }, 500);
            }
        }
    } else {
        primera.classList.remove("tarjeta-visible");
        primera.classList.add("tarjeta-oculta");
        primera.style.backgroundImage = "url(images/interrogacion.jpg)";

        segunda.classList.remove("tarjeta-visible");
        segunda.classList.add("tarjeta-oculta");
        segunda.style.backgroundImage = "url(images/interrogacion.jpg)";
    }

    seleccion = [];
}

iniciarJuego();



/*=====================================================
VILLA LOS AGAPANTOS
SCRIPT.JS
=====================================================*/

/*=========================================
FECHA Y HORA
=========================================*/

function actualizarFechaHora(){

const fecha=new Date();

const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

const diaSemana = dias[fecha.getDay()];
const dia = String(fecha.getDate()).padStart(2, "0");
const mes = String(fecha.getMonth() + 1).padStart(2, "0");
const anio = fecha.getFullYear();

document.getElementById("fechaActual").textContent =
`${diaSemana} ${dia}-${mes}-${anio}`;

document.getElementById("horaActual").textContent =
fecha.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});

}

setInterval(actualizarFechaHora,1000);

actualizarFechaHora();

/*=========================================
BOTÓN VOLVER ARRIBA
=========================================*/

const btnArriba=document.getElementById("btnArriba");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

btnArriba.style.display="flex";

}else{

btnArriba.style.display="none";

}

});

btnArriba.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*=========================================
ANIMACIONES AL HACER SCROLL
=========================================*/

const elementos=document.querySelectorAll(

".card-foto,.aviso-card,.info-card,.evento,.info-util"

);

const mostrarElemento=()=>{

elementos.forEach(el=>{

const posicion=el.getBoundingClientRect().top;

const pantalla=window.innerHeight-120;

if(posicion<pantalla){

el.classList.add("visible");

}

});

};

window.addEventListener("scroll",mostrarElemento);

mostrarElemento();

/*=========================================
BARRA DE PROGRESO
=========================================*/

const barra=document.createElement("div");

barra.id="progress";

document.body.appendChild(barra);

window.addEventListener("scroll",()=>{

const altura=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;

const progreso=(window.scrollY/altura)*100;

barra.style.width=progreso+"%";

});

/*=========================================
LIGHTBOX
=========================================*/

const lightbox=document.createElement("div");

lightbox.className="lightbox";

const imagen=document.createElement("img");

lightbox.appendChild(imagen);

document.body.appendChild(lightbox);

document.querySelectorAll(".card-foto img").forEach(foto=>{

foto.addEventListener("click",()=>{

imagen.src=foto.src;

lightbox.style.display="flex";

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});

/*=========================================
FORMULARIO
=========================================*/

const formulario=document.getElementById("formSugerencias");

if(formulario){

formulario.addEventListener("submit",(e)=>{

e.preventDefault();

alert(

"Muchas gracias. Tu sugerencia ha sido registrada."

);

formulario.reset();

});

}
/*=========================================
MODO OSCURO
=========================================*/

const botonModo=document.createElement("button");

botonModo.innerHTML="🌙";

botonModo.id="modoOscuro";

document.body.appendChild(botonModo);

botonModo.style.position="fixed";
botonModo.style.left="25px";
botonModo.style.bottom="30px";
botonModo.style.width="60px";
botonModo.style.height="60px";
botonModo.style.borderRadius="50%";
botonModo.style.border="none";
botonModo.style.cursor="pointer";
botonModo.style.fontSize="22px";
botonModo.style.background="#183153";
botonModo.style.color="white";
botonModo.style.boxShadow="0 15px 30px rgba(0,0,0,.25)";
botonModo.style.zIndex="99999";

botonModo.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

botonModo.innerHTML="☀️";

}else{

botonModo.innerHTML="🌙";

}

};

/*=========================================
MENÚ ACTIVO
=========================================*/

const links=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let actual="";

document.querySelectorAll("section").forEach(seccion=>{

const top=window.scrollY;

const offset=seccion.offsetTop-150;

const alto=seccion.offsetHeight;

if(top>=offset && top<offset+alto){

actual=seccion.getAttribute("id");

}

});

links.forEach(link=>{

link.classList.remove("activo");

if(link.getAttribute("href")==="#"+actual){

link.classList.add("activo");

}

});

});

/*=========================================
EFECTO HERO
=========================================*/

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

hero.style.backgroundPositionY=

(window.scrollY*0.4)+"px";

});

/*=========================================
SALUDO
=========================================*/

window.addEventListener("load",()=>{

console.log("Villa Los Agapantos cargada correctamente.");

});

/*=========================================
PREPARADO PARA API CLIMA
=========================================*/

// Aquí conectaremos Open-Meteo
async function cargarClima() {

    try {

        const respuesta = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-33.2047&longitude=-70.6781&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSantiago"
        );

        const datos = await respuesta.json();

        const codigo = datos.current.weather_code;

        

        let estado = "Clima";
let icono = "fa-cloud-sun";

if (codigo === 0) {
    estado = "Despejado";
    icono = "fa-sun";
}
else if (codigo === 1) {
    estado = "Mayormente despejado";
    icono = "fa-cloud-sun";
}
else if (codigo === 2) {
    estado = "Parcialmente nublado";
    icono = "fa-cloud-sun";
}
else if (codigo === 3) {
    estado = "Nublado";
    icono = "fa-cloud";
}
else if (codigo >= 51 && codigo <= 57) {
    estado = "Llovizna";
    icono = "fa-cloud-rain";
}
else if (codigo >= 61 && codigo <= 67) {
    estado = "Lluvia";
    icono = "fa-cloud-rain";
}
else if (codigo >= 71 && codigo <= 77) {
    estado = "Nieve";
    icono = "fa-snowflake";
}
else if (codigo >= 80 && codigo <= 82) {
    estado = "Chubascos";
    icono = "fa-cloud-showers-heavy";
}
else if (codigo >= 95 && codigo <= 99) {
    estado = "Tormenta";
    icono = "fa-cloud-bolt";
}

        
        document.getElementById("iconoClima").className =
    `fa-solid ${icono}`;

        document.getElementById("temperaturaActual").textContent =
    `${datos.current.temperature_2m.toFixed(1)}°`;

        

    } catch (error) {

        document.getElementById("estadoClima").textContent = "No disponible";

        document.getElementById("temperaturaActual").textContent = "";

        document.getElementById("temperaturasDia").textContent = "";

    }

}

cargarClima();

/*=========================================
PREPARADO PARA API UF
=========================================*/
/*=========================================*
*UF Y UTM
*=========================================*/

async function cargarIndicadores() {

    try {

        const [ufRes, utmRes] = await Promise.all([
            fetch("https://api.restart.cl/v1/indicadores/uf"),
            fetch("https://api.restart.cl/v1/indicadores/utm")
        ]);

        const uf = await ufRes.json();
        const utm = await utmRes.json();

        document.getElementById("uf").textContent =
            Number(uf.data.attributes.valor).toLocaleString("es-CL");

        document.getElementById("utm").textContent =
            Number(utm.data.attributes.valor).toLocaleString("es-CL");

    } catch (error) {

        document.getElementById("uf").textContent = "No disponible";
        document.getElementById("utm").textContent = "No disponible";

    }

}

cargarIndicadores();

    



// Aquí conectaremos Banco Central o mindicador.cl

/*=========================================
PREPARADO PARA CALENDARIO
=========================================*/

// Aquí agregaremos FullCalendar

/*=========================================
FIN DEL SCRIPT
=========================================*/
const menuBtn = document.querySelector(".menu-toggle");
const nav = document.getElementById("menu");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("activo");
    });
}
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("activo");
    });
});
/*=========================================
CONTADOR DE VISITAS
=========================================*/

async function cargarContador() {

    try {

        const respuesta = await fetch("http://127.0.0.1:8787/contador");

        const datos = await respuesta.json();

        const contador = document.getElementById("contadorVisitas");

contador.textContent = datos.visitas;

    } catch (error) {

        console.error("Error al obtener el contador");

    }

}

cargarContador();
window.addEventListener("load", () => {
    window.dispatchEvent(new Event("resize"));
});
/*=========================================*
*SANTO DEL DÍA
*=========================================*/

/*=========================================*
*SANTO DEL DÍA
*=========================================*/

async function cargarSanto() {

    try {

        const respuesta = await fetch("https://api.restart.cl/v1/santoral");

        const datos = await respuesta.json();

        document.getElementById("santoDia").textContent =
            datos.data.attributes.nombres
                .join(" • ")
                .replace(/[()]/g, "");

    } catch (error) {

        document.getElementById("santoDia").textContent =
            "No disponible";

        console.error(error);

    }

}

cargarSanto();
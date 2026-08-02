/*=====================================================
VILLA LOS AGAPANTOS
SCRIPT.JS
=====================================================*/

/*=========================================
FECHA Y HORA
=========================================*/

function actualizarFechaHora(){

const fecha=new Date();

const opcionesFecha={
weekday:'long',
day:'numeric',
month:'long',
year:'numeric'
};

document.getElementById("fechaActual").textContent=
fecha.toLocaleDateString('es-CL',opcionesFecha);

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

/*=========================================
PREPARADO PARA API UF
=========================================*/

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

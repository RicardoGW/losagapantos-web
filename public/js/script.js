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

        const respuesta = await fetch("https://losagapantos-contador.ricardogarcesw.workers.dev/contador");

        const datos = await respuesta.json();

        const contador = document.getElementById("contadorVisitas");

const numero = String(datos.visitas).padStart(6, "0");

contador.innerHTML = "";

for (const digito of numero) {
    const span = document.createElement("span");
    span.textContent = digito;
    contador.appendChild(span);
}

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

        const respuesta = await fetch(
            "https://api.boostr.cl/santorales.json"
        );

        const datos = await respuesta.json();

        const ahoraChile = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "America/Santiago"
            })
        );

        const mes = ahoraChile.toLocaleString("es-CL", {
            month: "long"
        });

        const dia = ahoraChile.getDate();

        const nombresMes = datos.data[mes];

        if (!nombresMes || !nombresMes[dia - 1]) {
            document.getElementById("santoDia").textContent =
                "No disponible";
            return;
        }

        document.getElementById("santoDia").textContent =
            nombresMes[dia - 1]
                .replace(/[()]/g, "")
                .split(",")[0]
                .trim();

    } catch (error) {

        document.getElementById("santoDia").textContent =
            "No disponible";

        console.error(error);

    }
}

cargarSanto();

setInterval(() => {

    const ahoraChile = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "America/Santiago"
        })
    );

    if (
        ahoraChile.getHours() === 0 &&
        ahoraChile.getMinutes() === 0 &&
        ahoraChile.getSeconds() === 0
    ) {

        cargarSanto();

    }

}, 1000);
/* =========================================
   NOTICIAS DE NUESTRA ZONA
   ========================================= */

async function cargarNoticias() {

    const lista = document.getElementById("noticiasLista");

    if (!lista) return;

    const contenedor = lista.closest(".noticias-contenedor");

    if (!contenedor) return;

    try {

        const respuesta = await fetch(
            "https://www.colina.cl/wp-json/wp/v2/posts?per_page=6&_embed"
        );

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las noticias");
        }

        const noticias = await respuesta.json();

        lista.innerHTML = "";

        /* =========================================
           CONFIGURACIÓN DEL CARRUSEL
           ========================================= */

        lista.style.setProperty(
            "display",
            "flex",
            "important"
        );

        lista.style.setProperty(
            "flex-direction",
            "row",
            "important"
        );

        lista.style.setProperty(
            "flex-wrap",
            "nowrap",
            "important"
        );

        lista.style.setProperty(
            "align-items",
            "stretch",
            "important"
        );

        lista.style.setProperty(
            "overflow-x",
            "auto",
            "important"
        );

        lista.style.setProperty(
            "overflow-y",
            "hidden",
            "important"
        );

        lista.style.setProperty(
            "scroll-behavior",
            "smooth",
            "important"
        );

        lista.style.setProperty(
            "scrollbar-width",
            "none",
            "important"
        );

        lista.style.setProperty(
            "gap",
            "18px",
            "important"
        );

        lista.style.setProperty(
            "box-sizing",
            "border-box",
            "important"
        );


        /* =========================================
           CREAR LAS NOTICIAS
           ========================================= */

        noticias.forEach(noticia => {

            const titulo = noticia.title.rendered;
            const enlace = noticia.link;

            const fecha =
                new Date(noticia.date).toLocaleDateString(
                    "es-CL",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );


            let imagen = "";

            if (
                noticia._embedded &&
                noticia._embedded["wp:featuredmedia"] &&
                noticia._embedded["wp:featuredmedia"][0]
            ) {

                imagen =
                    noticia._embedded["wp:featuredmedia"][0].source_url;
            }


            const tarjeta =
                document.createElement("article");

            tarjeta.className =
                "noticia-card";


            tarjeta.innerHTML = `
                <a
                    href="${enlace}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                        display:block;
                        width:100%;
                        height:100%;
                        text-decoration:none;
                        color:inherit;
                    "
                >

                    <div class="noticia-imagen">

                        ${
                            imagen
                            ? `
                                <img
                                    src="${imagen}"
                                    alt="${titulo}"
                                >
                              `
                            : `
                                <div class="noticia-placeholder">
                                    📰
                                </div>
                              `
                        }

                    </div>

                    <div class="noticia-contenido">

                        <span class="noticia-fuente">
                            MUNICIPALIDAD DE COLINA
                        </span>

                        <h3>
                            ${titulo}
                        </h3>

                        <p class="noticia-fecha">
                            ${fecha}
                        </p>

                    </div>

                </a>
            `;


            /* =========================================
               TAMAÑO PC / MÓVIL
               ========================================= */

            if (window.innerWidth <= 768) {

                tarjeta.style.setProperty(
                    "flex",
                    "0 0 88%",
                    "important"
                );

                tarjeta.style.setProperty(
                    "width",
                    "88%",
                    "important"
                );

                tarjeta.style.setProperty(
                    "min-width",
                    "88%",
                    "important"
                );

                tarjeta.style.setProperty(
                    "max-width",
                    "88%",
                    "important"
                );

                tarjeta.style.setProperty(
                    "height",
                    "305px",
                    "important"
                );

            } else {

                tarjeta.style.setProperty(
                    "flex",
                    "0 0 300px",
                    "important"
                );

                tarjeta.style.setProperty(
                    "width",
                    "300px",
                    "important"
                );

                tarjeta.style.setProperty(
                    "min-width",
                    "300px",
                    "important"
                );

                tarjeta.style.setProperty(
                    "max-width",
                    "300px",
                    "important"
                );

                tarjeta.style.setProperty(
                    "height",
                    "320px",
                    "important"
                );
            }


            tarjeta.style.setProperty(
                "flex-shrink",
                "0",
                "important"
            );

            tarjeta.style.setProperty(
                "flex-grow",
                "0",
                "important"
            );

            tarjeta.style.setProperty(
                "overflow",
                "hidden",
                "important"
            );


            /* =========================================
               IMAGEN
               ========================================= */

            const imagenContenedor =
                tarjeta.querySelector(
                    ".noticia-imagen"
                );

            const imagenElemento =
                tarjeta.querySelector(
                    ".noticia-imagen img"
                );


            const altoImagen =
                window.innerWidth <= 768
                ? "120px"
                : "125px";


            imagenContenedor.style.setProperty(
                "width",
                "100%",
                "important"
            );

            imagenContenedor.style.setProperty(
                "height",
                altoImagen,
                "important"
            );

            imagenContenedor.style.setProperty(
                "min-height",
                altoImagen,
                "important"
            );

            imagenContenedor.style.setProperty(
                "max-height",
                altoImagen,
                "important"
            );

            imagenContenedor.style.setProperty(
                "overflow",
                "hidden",
                "important"
            );


            if (imagenElemento) {

                imagenElemento.style.setProperty(
                    "display",
                    "block",
                    "important"
                );

                imagenElemento.style.setProperty(
                    "width",
                    "100%",
                    "important"
                );

                imagenElemento.style.setProperty(
                    "height",
                    altoImagen,
                    "important"
                );

                imagenElemento.style.setProperty(
                    "min-height",
                    altoImagen,
                    "important"
                );

                imagenElemento.style.setProperty(
                    "max-height",
                    altoImagen,
                    "important"
                );

                imagenElemento.style.setProperty(
                    "object-fit",
                    "cover",
                    "important"
                );

                imagenElemento.style.setProperty(
                    "object-position",
                    "center",
                    "important"
                );
            }


            lista.appendChild(tarjeta);

        });


        /* =========================================
           PREPARAR CONTENEDOR
           ========================================= */

        contenedor.style.setProperty(
            "position",
            "relative",
            "important"
        );


        contenedor.style.setProperty(
            "width",
            "100%",
            "important"
        );


        /* =========================================
           BUSCAR FLECHAS
           ========================================= */

        let botonAnterior =
            contenedor.querySelector(
                ".noticias-anterior"
            );

        let botonSiguiente =
            contenedor.querySelector(
                ".noticias-siguiente"
            );


        /* =========================================
           CREAR FLECHA IZQUIERDA SI NO EXISTE
           ========================================= */

        if (!botonAnterior) {

            botonAnterior =
                document.createElement("button");

            botonAnterior.className =
                "noticias-flecha noticias-anterior";

            botonAnterior.type =
                "button";

            botonAnterior.innerHTML =
                "‹";

            contenedor.insertBefore(
                botonAnterior,
                lista
            );
        }


        /* =========================================
           CREAR FLECHA DERECHA SI NO EXISTE
           ========================================= */

        if (!botonSiguiente) {

            botonSiguiente =
                document.createElement("button");

            botonSiguiente.className =
                "noticias-flecha noticias-siguiente";

            botonSiguiente.type =
                "button";

            botonSiguiente.innerHTML =
                "›";

            contenedor.appendChild(
                botonSiguiente
            );
        }


        /* =========================================
           POSICIÓN DE LAS FLECHAS
           ========================================= */

        const tamanoFlecha =
            window.innerWidth <= 768
            ? "34px"
            : "40px";


        const mitadFlecha =
            window.innerWidth <= 768
            ? "-17px"
            : "-20px";


        [botonAnterior, botonSiguiente].forEach(
            boton => {

                boton.style.setProperty(
                    "position",
                    "absolute",
                    "important"
                );

                boton.style.setProperty(
                    "top",
                    "50%",
                    "important"
                );

                boton.style.setProperty(
                    "transform",
                    "translateY(-50%)",
                    "important"
                );

                boton.style.setProperty(
                    "width",
                    tamanoFlecha,
                    "important"
                );

                boton.style.setProperty(
                    "height",
                    tamanoFlecha,
                    "important"
                );

                boton.style.setProperty(
                    "min-width",
                    tamanoFlecha,
                    "important"
                );

                boton.style.setProperty(
                    "padding",
                    "0",
                    "important"
                );

                boton.style.setProperty(
                    "border",
                    "none",
                    "important"
                );

                boton.style.setProperty(
                    "border-radius",
                    "50%",
                    "important"
                );

                boton.style.setProperty(
                    "background",
                    "linear-gradient(135deg, var(--azul), var(--verde))",
                    "important"
                );

                boton.style.setProperty(
                    "color",
                    "#ffffff",
                    "important"
                );

                boton.style.setProperty(
                    "font-size",
                    window.innerWidth <= 768
                    ? "23px"
                    : "27px",
                    "important"
                );

                boton.style.setProperty(
                    "line-height",
                    "1",
                    "important"
                );

                boton.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );

                boton.style.setProperty(
                    "align-items",
                    "center",
                    "important"
                );

                boton.style.setProperty(
                    "justify-content",
                    "center",
                    "important"
                );

                boton.style.setProperty(
                    "cursor",
                    "pointer",
                    "important"
                );

                boton.style.setProperty(
                    "z-index",
                    "100",
                    "important"
                );

                boton.style.setProperty(
                    "box-shadow",
                    "0 5px 15px rgba(0,0,0,.20)",
                    "important"
                );
            }
        );


        /* =========================================
           FLECHA IZQUIERDA
           ========================================= */

        botonAnterior.style.setProperty(
            "left",
            mitadFlecha,
            "important"
        );


        /* =========================================
           FLECHA DERECHA
           ========================================= */

        botonSiguiente.style.setProperty(
            "right",
            mitadFlecha,
            "important"
        );


        /* =========================================
           AVANZAR UNA NOTICIA
           ========================================= */

        function moverNoticias(direccion) {

            const tarjeta =
                lista.querySelector(
                    ".noticia-card"
                );

            if (!tarjeta) return;


            const anchoTarjeta =
                tarjeta.getBoundingClientRect().width;


            const estilos =
                getComputedStyle(lista);


            const separacion =
                parseFloat(estilos.gap) || 18;


            lista.scrollBy({
                left:
                    direccion *
                    (anchoTarjeta + separacion),
                behavior: "smooth"
            });
        }


        /* =========================================
           BOTÓN ANTERIOR
           ========================================= */

        botonAnterior.onclick = function () {

            moverNoticias(-1);

        };


        /* =========================================
           BOTÓN SIGUIENTE
           ========================================= */

        botonSiguiente.onclick = function () {

            moverNoticias(1);

        };


        /* =========================================
           POSICIÓN INICIAL
           ========================================= */

        lista.scrollLeft = 0;


    } catch (error) {

        console.error(
            "Error al cargar noticias:",
            error
        );

        lista.innerHTML = `
            <article class="noticia-card">

                <div class="noticia-imagen">

                    <div class="noticia-placeholder">
                        📰
                    </div>

                </div>

                <div class="noticia-contenido">

                    <span class="noticia-fuente">
                        NOTICIAS LOCALES
                    </span>

                    <h3>
                        Noticias temporalmente no disponibles
                    </h3>

                    <p class="noticia-fecha">
                        Intenta nuevamente más tarde.
                    </p>

                </div>

            </article>
        `;
    }
}


/* =========================================
   CARGAR NOTICIAS AL ABRIR
   ========================================= */

cargarNoticias();


/* =========================================
   ACTUALIZAR CADA 30 MINUTOS
   ========================================= */

setInterval(
    cargarNoticias,
    10 * 60 * 1000
);
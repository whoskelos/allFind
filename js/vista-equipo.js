var listaEquipos = [];
onload = () => {
    cargarEquipos();
    pintarEquipo();
    document.getElementsByClassName("opciones-equipo")[0].addEventListener("click",mostrarCaracteristicas);
    document.getElementsByClassName("opciones-equipo")[1].addEventListener("click",mostrarEnlaces);
};

function cargarEquipos() {
    if (localStorage.getItem("datos") == null) {
        $.get("/datos/equipos.txt", {}, (respuesta) => {
            listaEquipos = JSON.parse(respuesta);
            localStorage.setItem("datos", JSON.stringify(listaEquipos));
        });
    } else {
        listaEquipos = JSON.parse(localStorage.getItem("datos"));
    }
}

function pintarEquipo() {
    let idEquipo = window.location.href.split("?")[1];
    let equipo = listaEquipos.find((e) => e.id_equipo == "00" + idEquipo);
    let divCentral = document.getElementById("central");
    console.log(equipo);

    divCentral.innerHTML = `
        <div class="row mt-5">
            <div class="col-md-6 d-flex justify-content-center">
                <img src="img/${equipo.imagen}" class="img-vista-detallada"></img>
            </div>
            <div class="col-md-6 mt-3 d-flex justify-content-center">
                <div class="tabs-equipo">
                    <div class="tabs">
                        <div class="opciones-equipo caracteristicasTab"><a>Características</a></div>
                        <div class="opciones-equipo enlacesTab"><a>Enlaces</a></div>
                    </div>
                    <div class="card" id="tarjetaEquipo" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${equipo.modelo}</h5>
                            <h6 class="card-subtitle mb-2 text-primary">${equipo.precio}€</h6>
                        </div>
                    </div>
                </div>
                </div>
            <div class="col mt-3">
                <h2 class="text-center">Opiniones</h2>
                <div class="cajaOpiniones">
                    <h4 class="userOpinion">${equipo.opiniones[0].usuario}</h4>
                    <p class="txtOpinion">${equipo.opiniones[0].comentario}</p>
                </div>
            </div>
        </div>
    `;
}

function mostrarCaracteristicas() {
    if (document.getElementsByClassName("txtEnlaces")[0]) {
        document.getElementsByClassName("txtEnlaces")[0].remove();
        document.getElementsByClassName("enlacesTab")[0].classList.remove("TabSelected");
        document.getElementsByClassName("caracteristicasTab")[0].classList.add("TabSelected");
    }
    if (!document.getElementsByClassName("txtCaracteristicas")[0]) {
        //guardo el id del equipo para buscarlo
        let idEquipo = window.location.href.split("?")[1];
        let equipo = listaEquipos.find((e) => e.id_equipo == "00" + idEquipo);
        //Creo el nuevo div
        let nuevoDiv = document.createElement("div");
        //busco el div de la tarjeta del equipo
        let tarjetaDatosEquipo = document.getElementById("tarjetaEquipo");
        tarjetaDatosEquipo.appendChild(nuevoDiv);
        nuevoDiv.className = "txtCaracteristicas";
        nuevoDiv.innerHTML += `<ul>
            <li><strong>Sistema operativo:</strong> ${equipo.so}</li>
            <li><strong>CPU:</strong> ${equipo.cpu}</li>
            <li><strong>RAM:</strong> ${equipo.ram} GB</li>
            <li><strong>Almacenamiento:</strong> ${equipo.almacenamiento} GB</li>
        </ul>`;
    }
}

function mostrarEnlaces() {
    if (document.getElementsByClassName("txtCaracteristicas")[0]) {
        document.getElementsByClassName("txtCaracteristicas")[0].remove();
        document.getElementsByClassName("caracteristicasTab")[0].classList.remove("TabSelected");
        document.getElementsByClassName("enlacesTab")[0].classList.add("TabSelected");
    }
    if (!document.getElementsByClassName("txtEnlaces")[0]) {
        //guardo el id del equipo para buscarlo
        let idEquipo = window.location.href.split("?")[1];
        let equipo = listaEquipos.find((e) => e.id_equipo == "00" + idEquipo);
         //Creo el nuevo div
         let nuevoDiv = document.createElement("div");
         //busco el div de la tarjeta del equipo
         let tarjetaDatosEquipo = document.getElementById("tarjetaEquipo");
         tarjetaDatosEquipo.appendChild(nuevoDiv);
         nuevoDiv.className = "txtEnlaces";
         nuevoDiv.innerHTML = `<h3>Enlaces de compra</h3>
            <p><a href="${equipo.enlace}" target="_blank">PC Componentes</a></p>
         `;
    }
    
}
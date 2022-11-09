var listaEquipos = []; //array de los equipos

onload = () => {
    cargarEquipos();
    if (document.getElementById("masValorados")) {
        pintarMasValorados();
    }
    if (document.getElementById("btn-rellenar-form")) {
        document
        .getElementById("btn-rellenar-form")
        .addEventListener("click", () => {
            location.href = "/form-busqueda.html";
        });
    }
};

function cargarEquipos() {
    if (localStorage.getItem("datos") == null) {
        $.get("/datos/equipos.txt", {}, (respuesta) => {
            listaEquipos = JSON.parse(respuesta);
            pintarEquipos(listaEquipos);
            localStorage.setItem("datos", JSON.stringify(listaEquipos));
        });
    } else {
        listaEquipos = JSON.parse(localStorage.getItem("datos"));
        pintarEquipos(listaEquipos);
    }
}

function pintarEquipos(lista) {
    if (document.getElementById("central")) {
        //localizo div donde voy a dibujar las tarjetas de los equipos
        let divCentral = document.getElementById("central");
        //recorro la lista y los dibujo
        listaEquipos.forEach((equipo) => {
            divCentral.innerHTML += `
            <div class="card mb-3" style="width: 18rem;">
            <img src="/img/${equipo.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${equipo.modelo}</h5>
            <p class="card-text"><strong>Precio: </strong>${equipo.precio}$</p>
            <p class="card-text"><strong>CPU: </strong>${equipo.cpu}</p>
            <p class="card-text"><strong>RAM: </strong>${equipo.ram} GB</p>
            <a class="btn btn-primary" id="btn-verDetalles" onclick="verDetalleEquipo(${equipo.id_equipo})">Ver detalles</a>
            
            </div>
            </div>`;
        });
    }
}

function pintarMasValorados() {
    let equiposMasValorados = listaEquipos.filter((ele) => ele.valoracion > 3);
    //localizo el div donde los voy a pintar
    let divMasValorados = document.getElementById("cajaEquiposValorados");
    //con slice pinto solo los 3 primeros que me devuelve la lista filtrada de los mas valorados
    equiposMasValorados.slice(0, 3).forEach((equipo) => {
        divMasValorados.innerHTML += `
        <div id="cajaEquipo-${equipo.id_equipo}" class="cajaEquipo text-center">
        <img src="img/${equipo.imagen}" alt="foto portatil">
        <span class="fw-bold fs-5 text-uppercase">${equipo.modelo}</span>
        </div>`;
    });
}

function verDetalleEquipo(id){
    location.href = "/vista-equipo.html?"+id;
}
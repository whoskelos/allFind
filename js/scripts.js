var listaEquipos = []; //array de los equipos

onload = () => {
    cargarEquipos();
    if (document.getElementById("masValorados")) {
        pintarMasValorados();
    }
};

function cargarEquipos() {
    if (localStorage.getItem("datos") == null) {
        $.get("/datos/equipos.txt", {}, (respuesta) => {
            listaEquipos = JSON.parse(respuesta);
            pintarEquipos(listaEquipos);
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
                    <p class="card-text"><strong>CPU: </strong>${equipo.cpu}$</p>
                    <p class="card-text"><strong>RAM: </strong>${equipo.ram}$</p>
                    <a href="#" class="btn btn-primary">Ver detalles</a>
                </div>
            </div>`;
        });
        //lo que he pintado lo guardo en localStorage
        localStorage.setItem("datos", JSON.stringify(listaEquipos));
    }
}

function pintarMasValorados() {
    let equiposMasValorados = listaEquipos.filter((ele) => ele.valoracion > 3);
    //localizo el div donde los voy a pintar
    let divMasValorados = document.getElementById("masValorados");
    equiposMasValorados.forEach((equipo) => {
        divMasValorados.innerHTML += `
        <div class="col-md-12 mas-valorados d-flex flex-wrap justify-content-around mb-2">
            <div class="cajaEquipo">
                <span class="fw-bold fs-5 text-uppercase">${equipo.modelo}</span>
                <img src="img/${equipo.imagen}" alt="foto portatil">
            </div>
        </div>
        `;
    });
}

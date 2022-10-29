var listaEquipos = []; //array de los equipos

onload = () => {
    cargarEquipos();
}

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
    //localizo div donde voy a dibujar las tarjetas de los equipos
    let divCentral = document.getElementById("central");
    //recorro la lista y los dibujo
    listaEquipos.forEach(equipo => {
        divCentral.innerHTML += `
        <div class="card mb-3" style="width: 18rem;">
            <img src="/img/${equipo.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${equipo.modelo}</h5>
                <p class="card-text"><strong>Precio: </strong>${equipo.precio}$</p>
                <p class="card-text"><strong>CPU: </strong>${equipo.cpu}$</p>
                <p class="card-text"><strong>RAM: </strong>${equipo.ram}$</p>
                <a href="#" class="btn btn-primary">Ver detalles</a>
            </div>
        </div>`;
    });
}

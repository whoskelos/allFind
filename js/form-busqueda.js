var listaEquipos = [];
onload = () => {
    cargarEquipos();
    document
        .getElementById("btnBuscar")
        .addEventListener("click", filtrarEquipo);
};

function cargarEquipos() {
    listaEquipos = JSON.parse(localStorage.getItem("datos"));
}

function filtrarEquipo() {
    //recogemos los valores de los select
    let optActividad = document.getElementById("actividadSelect").value; //para qué lo necesita
    let optTipo = document.getElementById("prefEquipo").value; // si es portatil o sobremesa
    let optPrecio = document.getElementById("presupuesto").value; //rango de precio en el que se encuentra
    optPrecio = optPrecio.split("-");

    //declaramos flag $errror = false;
    let error = false;

    //comprobamos que todos los select tengan valores seleccionado
    if (optActividad == "" || optTipo == "" || optPrecio == "") {
        error = true;
    }

    if (document.getElementById("msgErr")) {
        document.getElementById("msgErr").remove();
    }
    //si ya existe el div lo elimina
    if (document.getElementById("mostrarEquipos")) {
        document.getElementById("mostrarEquipos").remove();
    }
    //si no hay errores realizamos la búsqueda
    if (!error) {
        //filtro la lista en base a lo que el cliente selecciona en los select
        let listaFiltrada = listaEquipos
            .filter((equipo) => equipo.tipo.toLowerCase() == optActividad.toLowerCase() && equipo.portatil == optTipo && (parseFloat(equipo.precio) >= parseFloat(optPrecio[0]) && parseFloat(equipo.precio) <= parseFloat(optPrecio[1])));

        //compruebo si el array esta vacio para mostrar mensaje de no se han encontrado coincidencias o pintar los equipos filtrados
        if (listaFiltrada.length <= 0) {
            document.querySelector("#mensajeError").innerHTML += `
            <div id="msgErr" class="errorFiltro">No se encontraron coincidencias</div>
            `;
        } else {
            //creo el div donde se van a mostrar los equipos filtrados
            let divEquiposFiltrados = document.createElement("div");
            divEquiposFiltrados.id = "mostrarEquipos";
            //lo inserto en el DOM
            document
                .getElementById("filaEquiposFiltrados")
                .appendChild(divEquiposFiltrados);
            divEquiposFiltrados.classList.add(
                "col",
                "d-flex",
                "flex-wrap",
                "justify-content-around"
            );
            //recorro la lista y los pinto
            listaFiltrada.forEach((equipo) => {
                divEquiposFiltrados.innerHTML += `
                            <div class="card mb-3" style="width: 18rem;">
                                <img src="/img/${equipo.imagen}" class="card-img-top" alt="${equipo.modelo}">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${equipo.modelo}</h5>
                                    <p class="card-text"><strong>Precio: </strong>${equipo.precio}€</p>
                                    <p class="card-text"><strong>CPU: </strong>${equipo.cpu}</p>
                                    <p class="card-text"><strong>RAM: </strong>${equipo.ram} GB</p>
                                    <a class="btn btn-primary" id="btn-verDetalles" onclick="verDetalleEquipo(${equipo.id_equipo})">Ver detalles</a>
                                </div>
                            </div>
                        `;
            });
        }
    } else {
        console.log("Seleccione todas las opciones");
    }
}

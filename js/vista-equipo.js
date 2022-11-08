var listaEquipos = [];
onload = () => {
    cargarEquipos();
    pintarEquipo();
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
    let seccionMain = document.getElementsByTagName("main")[0];
    let idEquipo = window.location.href.split("?")[1];
    let equipo = listaEquipos.find((e) => e.id_equipo == "00" + idEquipo);
    console.log(equipo);
    let divCentral = document.getElementById("central");

    divCentral.innerHTML = `
        <div class="row mt-5">
            <div class="col-md-6 d-flex justify-content-center">
                <img src="img/${equipo.imagen}" class="img-vista-detallada"></img>
            </div>
            <div class="col-md-6 mt-3 d-flex justify-content-center">
                <div class="tabs-equipo">
                    <div class="tabs">
                        <div class="opciones-equipo caracteristicasTab">Características</div>
                        <div class="opciones-equipo enlacesTab">Enlaces</div>
                    </div>
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${equipo.modelo}</h5>
                            <h6 class="card-subtitle mb-2 text-primary">${equipo.precio}€</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

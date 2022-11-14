var listaEquipos = [];
onload = () => {
    cargarEquipos();
    document.getElementById("btnBuscar").addEventListener("click",filtrarEquipo);
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

    //si no hay errores realizamos la búsqueda
    if (!error) {
        console.log(optActividad);
        console.log(optTipo);
        console.log(optPrecio);
        let listaFiltrada = listaEquipos.filter(equipo => equipo.tipo.toLowerCase() == optActividad.toLowerCase()).filter(ele => ele.portatil.toLowerCase() == optTipo.toLowerCase());
        console.log("EQUIPOS FILTRADOS: ",listaFiltrada);
    }else {
        console.log("Seleccione todas las opciones");
    }

}




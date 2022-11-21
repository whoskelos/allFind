var listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
var listaEquipos = JSON.parse(localStorage.getItem("datos"));
var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

onload = () => {
    document.getElementById("enlaceLogin").remove();
    estaLogueado();
    generarBtnLogout();
    document
        .getElementById("verEquipos")
        .addEventListener("click", mostrarEquipos);
    document
        .getElementById("verUsuarios")
        .addEventListener("click", mostrarUsuarios);
};

function estaLogueado() {
    if (!usuarioLogueado) {
        location.href = "/index.html";
    }
}

function generarBtnLogout() {
    document.getElementById("enlacesNavbar").innerHTML += `
        <li class="nav-item">
            <a class="nav-link disabled">${usuarioLogueado}</a>
        </li>
        <button type="button" class="btn btn-danger btn-sm my-2" onclick="cerrarSesion()">Cerrar sesion</button>
    `;
}

function cerrarSesion() {
    sessionStorage.removeItem("usuarioAdmin");
    location.href = "/login.html";
}

function mostrarEquipos() {
    console.log("vista equipos");
    if ((t = document.getElementById("tabla"))) {
        t.remove();
    }
    let divVista = document.getElementById("vistaEquiposUsuarios");
    if (!document.getElementById("tabla")) {
        divVista.innerHTML =
            "<table class='' id='tabla'><tbody></tbody></table>";
        let tbody = document.getElementsByTagName("tbody")[0];
        let thead = document.createElement("thead");
        tbody.appendChild(thead);
        thead.innerHTML = `
            <tr class="">
                <th class="">Imagen</th>
                <th class="">ID</th>
                <th class="">Modelo</th>
                <th class="">Precio</th>
                <th class="">Editar</th>
                <th class="">Eliminar</th>
            </tr>
        `;
        listaEquipos.forEach((ele) => {
            tbody.innerHTML += `<tr class="">
                <td class=""><img src="img/${ele.imagen}" class="imgEquipo"></img></td>
                <td class="">${ele.id_equipo}</td>
                <td class="">${ele.modelo}</td>
                <td class="">${ele.precio}</td>
                <td class=""><button class="btn btn-warning"><img src="/img/editar.png" class="imgBtn"></img></button></td>
                <td class=""><button class="btn btn-danger" onclick="eliminarEquipo(${ele.id_equipo})"><img src="/img/eliminar.png" class="imgBtn"></img></button></td>
            </tr>
            `;
        });
    }
}

function mostrarUsuarios() {
    console.log("vista usuarios");
    let divVista = document.getElementById("vistaEquiposUsuarios");
    if ((t = document.getElementById("tabla"))) {
        t.remove();
    }

    if (!document.getElementById("tabla")) {
        divVista.innerHTML =
            "<table class='' id='tabla'><tbody></tbody></table>";
        let tbody = document.getElementsByTagName("tbody")[0];
        let thead = document.createElement("thead");
        tbody.appendChild(thead);
        thead.innerHTML = `
            <tr class="">
                <th class="">Foto</th>
                <th class="">ID</th>
                <th class="">Nombre</th>
                <th class="">Apellidos</th>
                <th class="">Editar</th>
                <th class="">Eliminar</th>
            </tr>
        `;
        listaUsuarios.forEach((ele) => {
            tbody.innerHTML += `<tr class="">
                <td class=""><img src="img/${ele.foto}" class="imgEquipo"></img></td>
                <td class="">${ele.id_usuario}</td>
                <td class="">${ele.nombre}</td>
                <td class="">${ele.apellidos}</td>
                <td class=""><button class="btn btn-warning"><img src="/img/editar.png" class="imgBtn"></img></button></td>
                <td class=""><button class="btn btn-danger" onclick="eliminarUsuario(${ele.id_usuario})"><img src="/img/eliminar.png" class="imgBtn"></img></button></td>
            </tr>
            `;
        });
    }
}

function eliminarUsuario(id) {
    let indexUser = listaUsuarios.findIndex(ele => ele.id_usuario == id);
    listaUsuarios.splice(indexUser,1);
    localStorage.setItem("usuarios",JSON.stringify(listaUsuarios));
    mostrarUsuarios();
}

function eliminarEquipo(id) {
    let indexEquipo = listaEquipos.findIndex(ele => ele.id_equipo == id);
    listaEquipos.splice(indexEquipo,1);
    localStorage.setItem("datos",JSON.stringify(listaEquipos));
    mostrarEquipos();
}

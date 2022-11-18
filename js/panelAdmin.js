var listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
var usuarioLogueado = sessionStorage.getItem("usuarioAdmin");

onload = () => {
    document.getElementById("enlaceLogin").remove();
    estaLogueado();
    generarBtnLogout();
}

function estaLogueado() {
    if (!usuarioLogueado) {
        location.href = "/index.html";
    }
}

function generarBtnLogout() {
    document.getElementById("enlacesNavbar").innerHTML += `
        <li class="nav-item">
            <span class="userLogueado"><img src="/img/logged.png"></img>${usuarioLogueado}</span>
        </li>
        <button type="button" class="btn btn-danger my-2" onclick="cerrarSesion()">Cerrar sesion</button>
    `;
}

function cerrarSesion() {
    sessionStorage.removeItem("usuarioAdmin");
    location.href = "/login.html";   
}
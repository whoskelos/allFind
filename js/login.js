var listaUsuarios = [];
onload = () => {
    cargarUsuarios();
    document
        .getElementById("btnLogin")
        .addEventListener("click", comprobarUsuario);
    document
        .getElementById("btnLogin")
        .addEventListener("keypress", comprobarUsuario);
    if (sessionStorage.getItem("usuarioAdmin")) {
        location.href = "/panelAdmin.html";
    }else if (sessionStorage.getItem("usuarioLogueado")) {
        location.href = "/index.html";
    }
};

function cargarUsuarios() {
    if (localStorage.getItem("usuarios") == null) {
        $.get("/datos/usuarios.txt", {}, (respuesta) => {
            listaUsuarios = JSON.parse(respuesta);
            localStorage.setItem("usuarios", respuesta);
        });
    } else {
        listaUsuarios = JSON.parse(localStorage.getItem("usuarios"));
    }
}

function comprobarUsuario() {
    //div para mostrar mensajes de error
    divErrores = document.getElementById("msgError");
    //recojo los valores de los inputs
    let inputUser = document.getElementById("txtUser");
    let inputPasswd = document.getElementById("txtPasswd");

    //expresion regular para comprobar que el campo username sea el correcto
    let patronUsername = /^@[a-z_0-9]+$/;

    let error = false;
    //comprobamos que los campos no esten vacios
    if (inputUser.value == "" || inputPasswd.value == "") {
        divErrores.innerHTML = `Rellene todos los campos`;
        error = true;
    } else {
        //comprobamos que el formato del usuario sea el correcto
        if (!patronUsername.test(inputUser.value.trim().toLowerCase())) {
            divErrores.innerHTML = `Formato incorrecto del nombre`;
            error = true;
        } else {
            usuarioFiltrado = listaUsuarios.find(
                (ele) => ele.username == inputUser.value
            );
        }
    }

    //si no hay errores llamamos a la funcion iniciar sesion
    if (!error) {
        iniciarSesion(usuarioFiltrado, inputPasswd.value);
    }
}

function iniciarSesion(user, pass) {
    //div para mostrar mensajes de error
    divErrores = document.getElementById("msgError");
    //comprobamos si es admin
    if (user.admin == "true") {
        //comprobamos que la contrasena es la que dice si es asi le mandamos al panel de admin y creamos sessionStorage
        if (user.password == pass) {
            divErrores.innerHTML = ``;
            //gurdamos en una sesion al usuario
            sessionStorage.setItem("usuarioAdmin",user.username);
            //redirigimos al panel de admin
            location.href = "/panelAdmin.html";
        } else {
            divErrores.innerHTML = `Contrasena erronea`;
        }
        //si es usuario normal comprobamos que la contrasena coincidan y le mandamos al index con un sessionStorage del usuario
    } else {
        if (user.password == pass) {
            divErrores.innerHTML = ``;
            //gurdamos en una sesion al usuario
            sessionStorage.setItem("usuarioLogueado",user.username);
            location.href = "/index.html";
        } else {
            divErrores.innerHTML = `Contrasena erronea`;
        }
    }
}

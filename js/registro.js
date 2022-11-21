var listaUsuarios = [];
onload = () => {
    cargarUsuarios();
    document
        .querySelector("#btnRegistro")
        .addEventListener("click", comprobarDatos);
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

function comprobarDatos() {
    //div para mostrar mensajes de error
    divErrores = document.getElementById("msgError");
    //datos del usuario que se quiere registrar para comprobarlos
    let txtUsername = document.querySelector("#txtUser");
    let txtPasswd = document.querySelector("#txtPasswd");
    let txtConfirmPasswd = document.querySelector("#txtConfirmPasswd");
    let txtNombre = document.querySelector("#txtNombre");
    let txtApellidos = document.querySelector("#txtApellidos");

    //variable que nos sirve como una flag
    let error = false;

    //expresion regular para comprobar que el campo username sea el correcto
    let patronUsername = /^@[a-z_0-9]+$/;
    //expresion regular para los campos que sean solo letras y espacios
    let patronSoloLetras = /^[a-z ]+$/i;

    //comrpobamos que los campos no esten vacios
    if (
        txtUsername.value == "" ||
        txtPasswd.value == "" ||
        txtConfirmPasswd.value == "" ||
        txtNombre.value == "" ||
        txtApellidos.value == ""
    ) {
        divErrores.innerHTML = `Rellene todos los campos`;
        error = true;
    } else {
        divErrores.innerHTML = ``;
        //comprobamos el formato de los campos sean los correctos
        if (!patronUsername.test(txtUsername.value.trim().toLowerCase())) {
            divErrores.innerHTML = `<p>Formato username invalido</p>`;
            error = true;
        }
        if (!patronSoloLetras.test(txtNombre.value.trim().toLowerCase())) {
            divErrores.innerHTML += `</p>Formato nombre invalido</p>`;
            error = true;
        }
        if (!patronSoloLetras.test(txtApellidos.value.trim().toLowerCase())) {
            divErrores.innerHTML += `<p>Formato apellidos invalido</p>`;
            error = true;
        }
    }

    //si no hay errores doy de alta
    if (!error) {
        darAltaUsuario(
            txtUsername.value,
            txtPasswd.value,
            txtConfirmPasswd.value,
            txtNombre.value,
            txtApellidos.value
        );
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function darAltaUsuario(user, pass, confirmPass, nom, ape) {
    console.log(user, pass, confirmPass, nom, ape);
    let nuevoIdUsuario = random(1, 999);
    console.log(nuevoIdUsuario);
    //primero buscamos si ese nombre de usuario ya existe en nuestra lista de usuarios
    if (listaUsuarios.findIndex((ele) => ele.username == user) != -1) {
        divErrores.innerHTML = `<p>Este nombre de usuario ya existe</p>`;
    } else {
        //si no existe comprobamos que las contrasenas coinciden
        if (pass === confirmPass) {
            console.log("las contrasenas coinciden");
            //AQUI CREO EL NUEVO USUARIO EN FORMA DE OBJETO Y LE AÑADO LOS VALORES QUE RECIBE DEL INPUT
            let nuevoUsuario = new Usuario(
                nuevoIdUsuario,
                user,
                pass,
                nom,
                ape
            );
            //metemos el usuario en el array
            listaUsuarios.push(nuevoUsuario);
            //guardo la nueva lista en el localStorage
            localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
            document.querySelector("#msgCorrecto").innerHTML = `
            <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">Usuario registrado correctamente.</div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            `;
        }
    }
}

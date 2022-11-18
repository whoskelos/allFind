class Usuario {
    constructor(
        id_usuario,
        username,
        password,
        nombre,
        apellidos,
        admin,
        foto,
        fecha_alta
    ) {
        this.id_usuario = id_usuario || "999";
        this.username = username || "@noName";
        this.password = password || "1234";
        this.nombre = nombre || "Sin nombre";
        this.apellidos = apellidos || "Sin apellidos";
        this.admin = admin || false
        this.foto = foto || "user.png";
        this.fecha_alta = fecha_alta || new Date();
    }
    mostrarFechaInc() {
        return this.fecha_alta.getDate() + "/" + (this.fecha_alta.getMonth(+1) + "/" + this.fecha_alta.getFullYear());
    }
}
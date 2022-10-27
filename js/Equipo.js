class Equipo{
    constructor (
        id_equipo,
        modelo,
        precio,
        so,
        cpu,
        ram,
        almacenamiento,
        opiniones,
        imagen
    ) {
        this.id_equipo = id_equipo || "ID no asignado";
        this.modelo = modelo || "Modelo no asignado";
        this.precio = precio || "Precio no asignado";
        this.so = so || "Sin SO asignado";
        this.cpu = cpu || "CPU no asignada";
        this.ram = ram || "RAM no asignada";
        this.almacenamiento = almacenamiento || "Almacenamiento no asignado";
        this.opiniones = opiniones;
        this.imagen = imagen || "sinImagen.png";
    }
}
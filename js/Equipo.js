class Equipo{
    constructor (
        id_equipo,
        portatil,
        modelo,
        precio,
        so,
        cpu,
        ram,
        valoracion,
        almacenamiento,
        tipo,
        opiniones,
        imagen
    ) {
        this.id_equipo = id_equipo || "ID no asignado";
        this.portatil = portatil || "no";
        this.modelo = modelo || "Modelo no asignado";
        this.precio = precio || "Precio no asignado";
        this.so = so || "Sin SO";
        this.cpu = cpu || "CPU no asignada";
        this.ram = ram || "RAM no asignada";
        this.valoracion = valoracion || "Equipo sin valoraciones";
        this.almacenamiento = almacenamiento || "Almacenamiento no asignado";
        this.tipo = tipo;
        this.opiniones = opiniones;
        this.imagen = imagen || "sinImagen.png";
    }
}
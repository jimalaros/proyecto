const productos =  [
    {
        id: 1,
        articulo: "Hamburguesa",
        precio: 5000
    },
    {
        id: 2,
        articulo: "Hamburguesa doble",
        precio: 10500
    },
    {
        id: 3,
        articulo: "Perro",
        precio: 5500
    },
    {
        id: 4,
        articulo: "Perro especial",
        precio: 9000
    },
    {
        id: 5,
        articulo: "Coca-cola",
        precio: 3000
    },
    {
        id: 6,
        articulo: "Sprite",
        precio: 2500
    },
    {
        id: 7,
        articulo: "Agua",
        precio: 1500
    },
    {
        id: 8,
        articulo: "Jugo",
        precio: 2000
    }
]

const mostrarProductos = () => {
    return productos;
}

const registrarProductos = (nombre, precio) => {
    const producto = {id: productos.length + 1, nombre, precio}
    //console.log(producto);
    productos.push(producto);
}

module.exports = { mostrarProductos, registrarProductos }
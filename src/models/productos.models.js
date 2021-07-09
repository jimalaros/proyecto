const productos =  [
    {
        id: 1,
        nombre: "Hamburguesa",
        precio: 5000
    },
    {
        id: 2,
        nombre: "Hamburguesa doble",
        precio: 10500
    },
    {
        id: 3,
        nombre: "Perro",
        precio: 5500
    },
    {
        id: 4,
        nombre: "Perro especial",
        precio: 9000
    },
    {
        id: 5,
        nombre: "Coca-cola",
        precio: 3000
    },
    {
        id: 6,
        nombre: "Sprite",
        precio: 2500
    },
    {
        id: 7,
        nombre: "Agua",
        precio: 1500
    },
    {
        id: 8,
        nombre: "Jugo",
        precio: 2000
    }
]

const mostrarProductos = () => {
    return productos;
}

const registrarProductos = (nombre, precio) => {
    const producto = {id: productos.length + 1, nombre, precio}
    productos.push(producto);
}

module.exports = { mostrarProductos, registrarProductos }

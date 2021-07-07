const usuarios = [
    
    {
        id: 1,
        usuario: "jimalaros",
        nombre: "Jimmy",
        apellido: "Arango",
        correo: "jimalaros25@gmail.com",
        telefono: "320740",
        direccion: "Carrera 14 # 30-28",
        contraseña: "12345",
        Administrador: true
    },
    {
        id: 2,
        usuario: "Alex123",
        nombre: "Alexander",
        apellido: "Ossa",
        correo: "alexander@gmail.com",
        telefono: "312766",
        direccion: "Carrera 14 # 14-08",
        contraseña: "6789",
        Administrador: false
    },
    {
        id: 3,
        usuario: "jaao",
        nombre: "jim",
        apellido: "osa",
        correo: "jim@utp.edu.com",
        telefono: "315711",
        direccion: "Carrera 8 # 25-18",
        contraseña: "13579",
        Administrador: false
    }
];

const mostrarUsuarios = () => {
    return usuarios;
}

const registrarUsuarios = (usuarioNuevo) => {
    usuarios.push(usuarioNuevo);
}

module.exports = { mostrarUsuarios, registrarUsuarios }

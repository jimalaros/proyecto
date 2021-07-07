const { mostrarUsuarios } = require('../models/usuarios.model');

const autorización = (usuario, contraseña) => {
    const usuarioEncontrado = mostrarUsuarios().find(u => u.correo === usuario && u.contraseña === contraseña);
    if (usuarioEncontrado) return true;
    else return false;
}

module.exports = {autorización};

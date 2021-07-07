const { mostrarUsuarios } = require('../models/usuarios.model');

const login = (usuario, contraseña) => {
    const usuarioEncontrado = mostrarUsuarios().find(u => u.correo === usuario && u.contraseña === contraseña);
    if (usuarioEncontrado) 
    { res.json('Sesión iniciada con exito');
    }
    else return false;
}

module.exports = {login};

const { mostrarUsuarios } = require('../models/usuarios.model');

function Usuario(req, res, next) 
{
    const {user} = req.auth
    console.log(user);
    const usuarioBuscado = mostrarUsuarios().find(u => u.correo === user);
    if (usuarioBuscado.Administrador === false) {next()}
    else {res.json('El usuario es administrador')}
}

module.exports = {Usuario};
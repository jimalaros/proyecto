const { mostrarUsuarios } = require('../models/usuarios.model');

function EsAdministrador(req, res, next) 
{
    const { user } = req.auth;
    console.log(user);
    const usuarioBuscado = mostrarUsuarios().find(u => u.correo === user);
    if (usuarioBuscado.Administrador === true) {next()}
    else {res.sendStatus(401)}
}

module.exports = {EsAdministrador};
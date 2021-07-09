const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { mostrarUsuarios, registrarUsuarios } = require('../models/usuarios.model');

router.get('/', (req, res) => {
    res.json(mostrarUsuarios());
});

router.post('/registro', (req, res) => {
    const { usuario, nombre, apellido, correo, telefono, direccion, contraseña } = req.body;
    if ( usuario && nombre && apellido && correo && telefono && direccion && contraseña ) {
        if(!mostrarUsuarios().find(u => u.correo === correo))
        {
            const id = mostrarUsuarios().length+1;
            const Administrador = false
            const usuarioNuevo = {id,...req.body, Administrador};
            registrarUsuarios(usuarioNuevo);
            res.status(201).json({msg: 'Bienvenido', nombre});
        }
        else res.status(400).json({err: 'El correo ya esta en uso'})
        
    } else {
        res.status(204).json({msg: 'Faltan datos'});
    }
});

router.post('/Login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const username = mostrarUsuarios().find(u => u.correo === email && u.contraseña === password)
        if (username) 
        {
            res.status(200).json({msg: 'Sesión iniciada'});    
        }
        else res.status(400).json({err: 'El usuario no se encuentra en el sistema'})
    }
    else res.status(204).json({err: 'Faltan datos'});
});

module.exports = router;

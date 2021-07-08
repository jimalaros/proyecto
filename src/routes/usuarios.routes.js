const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { mostrarUsuarios, registrarUsuarios } = require('../models/usuarios.model');

router.get('/', (req, res) => {
    res.sendStatus(200).json(mostrarUsuarios());
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
            res.sendStatus(201).json('Bienvenido', nombre);
        }
        else res.sendStatus(400).json({err: 'El correo ya esta en uso'})
        
    } else {
        res.sendStatus(204).json({msg: 'Faltan datos'});
    }
});

router.post('/Login', (req, res) => {
    const { correo, contraseña } = req.body;
    if (correo && contraseña) {
        const username = mostrarUsuarios().find(u => u.correo === correo && u.contraseña === contraseña)
        if (username) 
        {
            res.sendStatus(200).json({msg: 'Sesión iniciada'});    
        }
        else res.sendStatus(204).json('Usuario no encontrado')
    }
    else res.sendStatus(204).json('Faltan datos');
});

module.exports = router;

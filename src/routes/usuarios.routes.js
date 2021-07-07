const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { mostrarUsuarios, registrarUsuarios } = require('../models/usuarios.model');

/**
 * @swagger
 * /usuarios:
 *  get:
 *      summary: Obtener todos los usuarios del sistema
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/newuser'
 */


router.get('/', (req, res) => {
    //console.log(req.auth.user);
    res.json(mostrarUsuarios());
});

/**
 * @swagger
 * /usuarios/registro:
 *  post:
 *      summary: Crea un usuario en el sistema
 *      security: []
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/newuser'
 *      responses:
 *          201:
 *              description: Usuario creado con exito
 *          500:
 *              description: El correo ya existe
 *          204:
 *              description: No se ingresaron todos los datos
 */

router.post('/registro', (req, res) => {
    const { usuario, nombre, apellido, correo, telefono, direccion, contraseña } = req.body;
    if ( usuario && nombre && apellido && correo && telefono && direccion && contraseña ) {
        if(!mostrarUsuarios().find(u => u.correo === correo))
        {
            const id = mostrarUsuarios().length+1;
            const Administrador = false
            const usuarioNuevo = {id,...req.body, Administrador};
            registrarUsuarios(usuarioNuevo);
            res.sendStatus(201).json(mostrarUsuarios());
        }
        else res.status(400).json({err: 'El correo ya esta en uso'})
        
    } else {
        res.json({msg: 'Faltan datos'});
    }
});

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *      summary: iniciar sesión en el sistema
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Inicio correcto de sesión 
 *          404:
 *              description: Usuario no encontrado en el sistema
 *          204:
 *              description: Faltan datos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 */

router.post('/Login', (req, res) => {
    const { correo, contraseña } = req.body;
    if (correo && contraseña) {
        const username = mostrarUsuarios().find(u => u.correo === correo && u.contraseña === contraseña)
        if (username) 
        {
            res.json({msg: 'Sesión iniciada'});    
        }
        else res.sendStatus(404).json('Usuario no encontrado')
    }
    else res.sendStatus(204).json('Faltan datos');
});

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Inicio de sesión
 * 
 * components: 
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              -correo
 *              -contraseña
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              contraseña:
 *                  type: string
 *                  description: Contrasena del usuario
 *          example:    
 *              correo: usuario@gmail.com
 *              contraseña: 12345
 */


/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      newuser:
 *          type: object
 *          required:
 *              -usuario
 *              -nombre
 *              -apellido
 *              -correo
 *              -telefono
 *              -direccion
 *              -contraseña
 *              -Administrador
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: identificador del usuario en la plataforma
 *              nombre:
 *                  type: string
 *                  description: nombre del usuario
 *              apellido:
 *                  type: string
 *                  description: apellido del usuario
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              telefono:
 *                  type: number
 *                  description: telefono del usuario
 *              direccion:
 *                  type: string
 *                  description: dirección del usuario
 *              contraseña:
 *                  type: string
 *                  description: Contrasena del usuario
 *              Administrador:
 *                  type: bool
 *                  description: rol del usuario en la plataforma, si es administrador, tendrá valor true, si no, tendrá valor false
 *          example:    
 *              usuario: usuario123
 *              nombre: name
 *              apellido: last name
 *              correo: usuario@gmail.com
 *              telefono: 123456
 *              direccion: Carrera 44 # 10-08
 *              contraseña: 12345
 */
module.exports = router;
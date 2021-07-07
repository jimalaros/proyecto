const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {EsAdministrador} = require('../middlewares/Administrador.middleware')
const { mostrarProductos, registrarProductos } = require('../models/productos.models');

/**
 * @swagger
 * /productos:
 *  get:
 *      summary: Obtener todos los productos del sistema
 *      tags: [Productos]
 *      responses:
 *          200:
 *              description: Lista de productps del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/neworder'
 */

router.get('/', (req, res) => {
    res.json(mostrarProductos());
});

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Crea un nuevo producto en el sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/neworder'
 *      responses:
 *          201:
 *              description: Producto creado con exito
 *          401:
 *              description: No eres administrador
 */

router.post('/nuevos', EsAdministrador, (req, res) => {
    const {nombree, precio} = req.body;
    if (nombree && precio && precio>0)
    {   
        const name = mostrarProductos().find(p => p.articulo === nombree)
        if(name)
        {
            res.json('El producto ya se encuentra registrado')
        }
        else
        {
            const Nuevo = {name, precio}
            registrarProductos(Nuevo)
            res.json(mostrarProductos());
        }
        
    }
    else res.status(400).json({err: 'Ya existe un producto con ese nombre'})
});

/**
 * @swagger
 *  /productos/{Id}:
 *      put:
 *          summary: Actualiza un producto por su Id.
 *          tags: [Productos]
 *          parameters:
 *          - id: integer 
 *            in: query
 *          name: Id
 *          type: integer
 *          required: true
 *          description: Identificador Numerico del producto a actualizar.
 *      responses:
 *          201:
 *              description: Producto actualizado con exito
 *          500:
 *              description: Faltan parametros
 */

 router.put('/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id);
    const { nombre, precio, } = req.body;
    if (nombre && precio) {
        const producto = mostrarProductos().find(p => p.id === id)
            if (producto) {
                producto.nombre = nombre;
                producto.precio = precio;
                producto.descripcion = descripcion;
            }
        res.json(mostrarProductos());
    } else {
        res.status(204).json({msg: 'Faltan campos por llenar'});
    }
});


/**
 * @swagger
 * /productos/id:
 *  delete:
 *      summary: Actualiza uno de los productos en el sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/neworderid'
 *      responses:
 *          200:
 *              description: Producto eliminado con exito
 */

 router.delete('/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id)
    const Productos = mostrarProductos().filter(u => u.id != id)
    res.json(Productos)
});

/**
 * @swagger
 * tags:
 *  name: Productos
 *  description: Seccion de usuarios
 * 
 * components: 
 *  schemas:
 *      neworder:
 *          type: object
 *          required:
 *              -nombre
 *              -precio
 *              -descripcion
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: nombre del producto
 *              precio:
 *                  type: string
 *                  description: precio del producto
 *              descripcion:
 *                  type: string
 *                  description: describe que tipo de producto es
 *             
 *          example:    
 *              nombre: Hamburguesa triple
 *              precio: 15000
 *              descripcion: Comida Rapida 
 */


module.exports = router;
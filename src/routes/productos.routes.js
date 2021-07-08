const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {EsAdministrador} = require('../middlewares/Administrador.middleware')
const { mostrarProductos, registrarProductos } = require('../models/productos.models');

router.get('/', (req, res) => {
    res.sendStatus(200).json(mostrarProductos());
});

router.post('/nuevos', EsAdministrador, (req, res) => {
    const {nombree, precio} = req.body;
    if (nombree && precio && precio>0)
    {   
        const name = mostrarProductos().find(p => p.articulo === nombree);
        if(name)
        {
            res.sendStatus(400).json('El producto ya se encuentra registrado');
        }
        else
        {
            const Nuevo = {name, precio}
            registrarProductos(Nuevo)
            res.sendStatus(201).json(mostrarProductos());
        }
        
    }
    else res.sendStatus(204).json({err: 'Faltan datos'});
});

 router.put('/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id);
    const { nombre, precio, } = req.body;
    if (nombre && precio) 
    {
        const producto = mostrarProductos().find(p => p.id === id);
        if (producto) 
        {
            producto.nombre = nombre;
            producto.precio = precio;
            producto.descripcion = descripcion;
            res.sendStatus(200).json(mostrarProductos());
        }
        else {
            res.status(204).json({msg: 'No se ha encontrado el producto'});
        } 
    } else {
        res.status(204).json({msg: 'Faltan campos por llenar'});
    }
});

 router.delete('/Eliminar/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id)
    const Productos = mostrarProductos().filter(u => u.id != id)
    res.sendStatus(200).json(Productos)
});

module.exports = router;

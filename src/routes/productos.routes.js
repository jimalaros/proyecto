const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {EsAdministrador} = require('../middlewares/Administrador.middleware')
const { mostrarProductos, registrarProductos } = require('../models/productos.models');

router.get('/', (req, res) => {
    res.json(mostrarProductos());
});

router.post('/nuevos', EsAdministrador, (req, res) => {
    const {nombre, precio} = req.body;
    if (nombre && precio && precio>0)
    {   
        const name = mostrarProductos().find(p => p.nombre === nombre);
        if(!name)
        {
            registrarProductos(nombre, precio);
            res.status(201).json({msg:'Producto creado con exito'});
        }
        else
        {
            res.status(400).json({err: 'El producto ya se encuentra registrado'});
        }
        
    }
    else res.status(204).json({err: 'Faltan datos'});
});

router.put('/EditarProducto/:id', EsAdministrador, (req, res) => {
    
    const {nombre, precio} = req.body;
    if (nombre && precio) 
    {
        const id = Number(req.params.id);
        mostrarProductos().forEach(producto => {
            if(producto.id === id)
            {
                producto.nombre=nombre;
                producto.precio=precio;
                res.status(200).json({msg: 'Producto editado con exito'});
            }
        });            
    }    
    else 
    {
        res.status(204).json({err: 'Faltan campos por llenar'});
    }
});

router.delete('/EliminarProducto/:id', EsAdministrador, (req, res) => {
    if (!mostrarProductos().some(u => u.id == req.params.id)){
        return res.status(400).json("El producto no esta registrado.")}
    else {
        const  product = mostrarProductos().find( u => u.id == req.params.id);
        mostrarProductos().splice(mostrarProductos().lastIndexOf(product),1);
        res.status(200).json({msg:'Producto eliminado'});
    }
});

module.exports = router;

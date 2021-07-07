const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const {Usuario} = require('../middlewares/Usuario.middleware');
const { mostrarUsuarios, registrarUsuarios } = require('../models/usuarios.model');
const {Precio} = require('../models/pedidos.models');

pedidosJimmy=[];
pedidosAlexander=[];
pedidosJim=[];
pedidos=[];
items=[];
articulos=[];
cantidades=[];
prices=[];
names=[];
total=[];
ORDENES=[];

/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: Los administradores podrán ver todos los pedidos de los usuarios
 *      tags: [Pedidos]
 *      responses:
 *          200:
 *              description: Lista de pedidos de los usuarios
 *          204:
 *              description: No hay pedidos para mostrar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedido'
 */

//HISTORIAL DE TODOS LOS PEDIDOS PARA ADMINISTRADORES
router.get('/historialadministradores/', EsAdministrador, (req, res) => {
    
    if(pedidosJimmy && pedidosAlexander && pedidosJim && pedidos)
    {   
        ORDENES.push(pedidosJimmy);
        ORDENES.push(pedidosAlexander);
        ORDENES.push(pedidosJim);
        ORDENES.push(pedidos);
        res.json(ORDENES);
    }
    else
    {
        res.sendStatus(204).json({msg: 'No hay pedidos para mostrar'});
    }
});

//HISTORIAL DE PEDIDOS POR USUARIO
router.get('/historial/:id', (req, res)=>{
    const id = Number(req.params.id);
    const username = mostrarUsuarios().find(u => u.id === id)
    const nombre = username.nombre;
    const telefono = username.telefono;
    const direccion = username.direccion;

    if(username.id === 1){
        const respuesta = { pedidosJimmy, nombre, direccion, telefono }
        res.json(respuesta);
    }
    if(username.id === 2){
        const respuesta = { pedidosAlexander, nombre, direccion, telefono }
        res.json(respuesta);
    }
    if(username.id === 3){
        const respuesta = { pedidosJim, nombre, direccion, telefono }
        res.json(respuesta);
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        const respuesta = { pedidos, nombre, direccion, telefono }
        res.json(respuesta);   
    }
    else{
        res.status(404).json(`El usuario ${nombre} no ha realizado ningún pedido`);
    }
});

/**
 * @swagger
 * /pedidos:
 *  post:
 *      summary: Para realizar un pedido
 *      tags: [Pedidos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedido'
 *      responses:
 *          201:
 *              description: Pedido creado con exito
 *          404:
 *              description: No existe el usuario en el sistema
 *          204:
 *              description: No se ingresaron todos los datos
 */

router.post('/CrearPedido/:id', (req,res) => {

    let { nombres, cantidades, mediodepago, estado } = req.body;
    if(nombres && cantidades && mediodepago && estado)    
    {
        const indice = Number(req.params.id);
        const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
        
        n=nombres.length;
        let preciototal = Precio(n, nombres, cantidades);

        if(Nombre_Usuario.id === 1)
        {
            let identificador = pedidosJimmy.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosJimmy.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(pedidosJimmy.length>0)
        {
            items.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado}
            pedidosJimmy.push(nuevoPedido);
            res.json(nuevoPedido);
        }        
        if(Nombre_Usuario.id === 2)
        {
            let identificador = pedidosAlexander.length+1
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado}
            pedidosAlexander.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(pedidosAlexander.length>0)
        {
            items.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado}
            pedidosAlexander.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(Nombre_Usuario.id === 3)
        {
            let identificador = pedidosJim.length+1
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado}
            pedidosJim.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(pedidosJim.length>0)
        {
            items.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador3, items, cantidades, preciototal, mediodepago, estado}
            pedidosJim.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
        {
            let identificador = pedidos.length+1
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado} 
            pedidos.push(nuevoPedido);
            res.json(nuevoPedido);
        }
        if(pedidos.length>0)
        {
            items.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, items, cantidades, preciototal, mediodepago, estado}
            pedidos.push(nuevoPedido);
            res.json(nuevoPedido);
        }
    }
    else{
        res.json({error: 'Faltan parametros'});
    }
    
});

router.put('/Confirmarpedido/:id', (req, res) => {
    const { n, nombree1, nombree2, nombree3, nombree4, nombree5, nombree6, nombree7, nombree8, total1, total2, total3, total4, total5, total6, total7, total8, formadepago, state } = req.body;
    if(n && nombree1 && total1 && formadepago && state)  
    {
        nombres = [nombree1, nombree2, nombree3, nombree4, nombree5, nombree6, nombree7, nombree8];
        cantidad = [total1, total2, total3, total4, total5, total6, total7, total8];
        precio = Precio(n, nombree1, nombree2, nombree3, nombree4, nombree5, nombree6, nombree7, nombree8, total1, total2, total3, total4, total5, total6, total7, total8);
        
        for (let index = 0; index < n; index++) {
            const a = nombres[index];
            items.push(a);
            const b = cantidad[index];
            cantidades.push(b);
        }
        
        const indice = Number(req.params.id);
        const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
        if(Nombre_Usuario.id === 1)
        {
            pedidosJimmy.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if(pedido.estado === "Abierto")
                    {
                        pedido.items = items;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = precio;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, cantidades, precio, formadepago, state}
                        items.splice(0,2);
                        cantidades.splice(0,2);
                        //pedidosJimmy.push(NewOrder);
                        res.sendStatus(200).json('La edición fue un exito');
                    }
                    else
                    {
                        res.json('Su pedido no puede ser editado');
                    }
                }
                else{
                    res.sendStatus(204).json({msg: "Pedido no encontrado"});
                }
            });
        }
        if(Nombre_Usuario.id === 2)
        {
            pedidosAlexander.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if(pedido.estado === "Abierto")
                    {
                        pedido.items = items;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = precio;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, cantidades, precio, formadepago, state}
                        //items.splice(0,2);
                        //cantidades.splice(0,2);
                        pedidosAlexander.push(NewOrder);
                        res.sendStatus(200).json('La edición fue un exito');
                    }
                    else
                    {
                        res.json('Su pedido no puede ser editado');
                    }
                }
                else{
                    res.sendStatus(204).json({msg: "Pedido no encontrado"});
                }
            });
        }
        if(Nombre_Usuario.id === 3)
        {
            pedidosJimmy.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if(pedido.estado === "Abierto")
                    {
                        pedido.items = items;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = precio;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, cantidades, precio, formadepago, state}
                        //items.splice(0,2);
                        //cantidades.splice(0,2);
                        pedidosJim.push(NewOrder);
                        res.sendStatus(200).json('La edición fue un exito');
                    }
                    else
                    {
                        res.json('Su pedido no puede ser editado');
                    }
                }    
                else{
                    res.sendStatus(204).json({msg: "Pedido no encontrado"});
                }
            });
        }
        if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
        {
            pedidos.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if (pedido.estado === "Abierto") {
                        pedido.items = items;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = precio;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, cantidades, precio, formadepago, state}
                        //items.splice(0,2);
                        //cantidades.splice(0,2);
                        pedidosJimmy.push(NewOrder);
                        res.sendStatus(200).json('La edición fue un exito');
                    }
                    else
                    {
                        res.json('Su pedido no puede ser editado');
                    }
                }
                else{
                    res.sendStatus(204).json({msg: "Pedido no encontrado"});
                }
            });
        }
    }
    else {
        res.status(500).json({error: 'Faltan datos'});
    } 
});

router.put('/estadopedido/:id', EsAdministrador, (req,res) => {
    const indice = Number(req.params.id);
    const { estado } = req.body;
    const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
    if(Nombre_Usuario.id === 1)
    {
        pedidosJimmy.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                //items.splice(0,2);
                //cantidades.splice(0,2);
                const new_order = { pedidosJimmy: (items, cantidades, estado), nombre, direccion, telefono };
                pedidosJim.push(new_order);
                res.sendStatus(200).json('La edición fue un exito');
            }
        });
    }
    if(Nombre_Usuario.id === 2)
    {
        pedidosAlexander.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                //items.splice(0,2);
                //cantidades.splice(0,2);
                const new_order = { pedidosJimmy: (items, cantidades, estado), nombre, direccion, telefono };
                pedidosJim.push(new_order);
                res.sendStatus(200).json('La edición fue un exito');
            }
        });
    }
    if(Nombre_Usuario.id === 3)
    {
        pedidosJim.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                //items.splice(0,2);
                //cantidades.splice(0,2);
                const new_order = { pedidosJimmy: (items, cantidades, estado), nombre, direccion, telefono };
                pedidosJim.push(new_order);
                res.sendStatus(200).json('La edición fue un exito');
            }
        });
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        pedidos.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                //items.splice(0,2);
                //cantidades.splice(0,2);
                const new_order = { pedidosJimmy: (items, cantidades, estado), nombre, direccion, telefono };
                pedidosJim.push(new_order);
                res.sendStatus(200).json('La edición fue un exito');
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    const indice = Number(req.params.id);
    const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
    if(Nombre_Usuario.id === 1)
    {
        const orders = pedidosJimmy.find(u => u.id != id)  
        res.json(orders) 
    }
    if(Nombre_Usuario.id === 2)
    {
        const orders = pedidosAlexander.find(u => u.id != id)  
        res.json(orders) 
    }
    if(Nombre_Usuario.id === 3)
    {
        const orders = pedidosJim.find(u => u.id != id)  
        res.json(orders) 
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        const orders = pedidos.find(u => u.id != id)  
        res.json(orders) 
    }
    
});

/**
 * @swagger
 * tags:
 *  name: Pedidos
 *  description: Seccion de pedidos
 * 
 * components: 
 *  schemas:
 *      pedido:
 *          type: object
 *          required:
 *              -n
 *              -nombres
 *              -cantidades
 *              -mediodepago
 *              -estado
 *          properties:
 *              nombres:
 *                  type: array
 *                  description: nombre del producto a pedir
 *              cantidades:
 *                  type: array
 *                  description: cantidad del producto a pedir
 *              mediodepago:
 *                  type: string
 *                  description: La forma de pagar del usuario
 *              estado:
 *                  type: string
 *                  description: El estado del pedido
 *          example:    
 *              n: 2
 *              nombre1: Coca-cola
 *              nombre2: Perro
 *              cantidad1: 2
 *              cantidad2: 3
 *              mediodepago: Efectivo
 *              estado: Confirmado
 */

module.exports = router;


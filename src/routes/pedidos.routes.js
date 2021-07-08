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



//HISTORIAL DE TODOS LOS PEDIDOS PARA ADMINISTRADORES
router.get('/', EsAdministrador, (req, res) => {
    
    if(pedidosJimmy && pedidosAlexander && pedidosJim && pedidos)
    {   
        ORDENES.push(pedidosJimmy);
        ORDENES.push(pedidosAlexander);
        ORDENES.push(pedidosJim);
        ORDENES.push(pedidos);
        res.sendStatus(200).json(ORDENES);
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
        res.sendStatus(200).json(respuesta);
    }
    if(username.id === 2){
        const respuesta = { pedidosAlexander, nombre, direccion, telefono }
        res.sendStatus(200).json(respuesta);
    }
    if(username.id === 3){
        const respuesta = { pedidosJim, nombre, direccion, telefono }
        res.sendStatus(200).json(respuesta);
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        const respuesta = { pedidos, nombre, direccion, telefono }
        res.sendStatus(200).json(respuesta);   
    }
    else{
        res.sendStatus(204).json(`El usuario ${nombre} no ha realizado ningún pedido`);
    }
});


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
            res.sendStatus(201).json(nuevoPedido);
        }
        if(pedidosJimmy.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosJimmy.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }        
        if(Nombre_Usuario.id === 2)
        {
            let identificador = pedidosAlexander.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosAlexander.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
        if(pedidosAlexander.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosAlexander.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
        if(Nombre_Usuario.id === 3)
        {
            let identificador = pedidosJim.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosJim.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
        if(pedidosJim.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador3, nombres, cantidades, preciototal, mediodepago, estado}
            pedidosJim.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
        if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
        {
            let identificador = pedidos.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado} 
            pedidos.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
        if(pedidos.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            pedidos.push(nuevoPedido);
            res.sendStatus(201).json(nuevoPedido);
        }
    }
    else{
        res.sendStatus(204).json({error: 'Faltan parametros'});
    }
});

router.put('/EditarPedido/:id', (req, res) => {
    const { n, items, amounts, formadepago, state } = req.body;
    if(n && items && amounts && formadepago && state)  
    {   
        n=items.length;
        let preciopedidoeditado = Precio(n, items, amounts);
        
        const indice = Number(req.params.id);
        const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
        if(Nombre_Usuario.id === 1)
        {
            pedidosJimmy.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if(pedido.estado === "Abierto")
                    {
                        pedido.nombres = items;
                        pedido.cantidades = amounts;
                        pedido.preciototal = preciopedidoeditado;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, amounts, preciopedidoeditado, formadepago, state}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosJimmy.push(NewOrder);
                        res.sendStatus(201).json('La edición fue un exito');
                    }
                    else
                    {
                        res.sendStatus(400).json('Su pedido no puede ser editado');
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
                        pedido.nombres = items;
                        pedido.cantidades = amounts;
                        pedido.preciototal = preciopedidoeditado;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, amounts, preciopedidoeditado, formadepago, state}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosAlexander.push(NewOrder);
                        res.sendStatus(201).json('La edición fue un exito');
                        
                    }
                    else
                    {
                        res.sendStatus(400).json('Su pedido no puede ser editado');
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
                        pedido.nombres = items;
                        pedido.cantidades = amounts;
                        pedido.preciototal = preciopedidoeditado;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, amounts, preciopedidoeditado, formadepago, state}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosJim.push(NewOrder);
                        res.sendStatus(201).json('La edición fue un exito');
                    }
                    else
                    {
                        res.sendStatus(400).json('Su pedido no puede ser editado');
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
                        pedido.nombres = items;
                        pedido.cantidades = amounts;
                        pedido.preciototal = preciopedidoeditado;
                        pedido.mediodepago = formadepago;
                        pedido.estado = state;
                        let identificador = "editado"
                        const NewOrder = {identificador, items, amounts, preciopedidoeditado, formadepago, state}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidos.push(NewOrder);
                        res.sendStatus(201).json('La edición fue un exito');
                    }
                    else
                    {
                        res.sendStatus(400).json('Su pedido no puede ser editado');
                    }
                }
                else{
                    res.sendStatus(204).json({msg: "Pedido no encontrado"});
                }
            });
        }
    }
    else {
        res.status(204).json({error: 'Faltan datos'});
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
                const new_Estate = { pedidosJimmy: (estado)};
                res.sendStatus(200).json(new_Estate);
            }
        });
    }
    if(Nombre_Usuario.id === 2)
    {
        pedidosAlexander.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                const new_Estate = { pedidosJimmy: (estado)};
                res.sendStatus(200).json(new_Estate);
            }
        });
    }
    if(Nombre_Usuario.id === 3)
    {
        pedidosJim.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                const new_Estate = { pedidosJimmy: (estado)};
                res.sendStatus(200).json(new_Estate);
            }
        });
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        pedidos.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                const new_Estate = { pedidosJimmy: (estado)};
                res.sendStatus(200).json(new_Estate);
            }
        });
    }
});


module.exports = router;


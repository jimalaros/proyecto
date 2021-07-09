const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const { mostrarUsuarios, registrarUsuarios } = require('../models/usuarios.model');
const {Precio} = require('../models/pedidos.models');
const { MostrarMediosdePago, RegistrarMediosdePago } = require('../models/mediosdepago.models');

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
        res.json(ORDENES);
    }
    else
    {
        res.status(204).json({err: 'No hay pedidos para mostrar'});
    }
});

//HISTORIAL DE PEDIDOS POR USUARIO
router.get('/historial/:id', (req, res)=>{
    const id = Number(req.params.id);
    const username = mostrarUsuarios().find(u => u.id === id);
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
        res.status(204).json({msg: `El usuario ${nombre} no ha realizado ningún pedido`});
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
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosJimmy.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(pedidosJimmy.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosJimmy.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }        
        if(Nombre_Usuario.id === 2)
        {
            let identificador = pedidosAlexander.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosAlexander.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(pedidosAlexander.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosAlexander.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(Nombre_Usuario.id === 3)
        {
            let identificador = pedidosJim.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosJim.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(pedidosJim.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador3, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidosJim.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
        {
            let identificador = pedidos.length+1
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado} 
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidos.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
        if(pedidos.length>0)
        {
            nombres.splice(0,2);
            cantidades.splice(0,2);
            const nuevoPedido = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
            if(MostrarMediosdePago().find(m => m.mediodepago === mediodepago))
            {
                pedidos.push(nuevoPedido);
                res.status(201).json({msg: 'Pedido creado con exito'});
            }
            else
            {
                res.status(400).json({err: 'El medio de pago no existe'})
            }
        }
    }
    else{
        res.status(204).json({err: 'Faltan datos'});
    }
});

router.put('/EditarPedido/:id', (req, res) => {
    const { nombres, cantidades, mediodepago, estado } = req.body;
    if(n && nombres && cantidades && mediodepago && estado)  
    {   
        n=nombres.length;
        let preciototal = Precio(n, nombres, cantidades);
        
        const indice = Number(req.params.id);
        const Nombre_Usuario = mostrarUsuarios().find(u => u.id === indice);
        if(Nombre_Usuario.id === 1)
        {
            pedidosJimmy.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if(pedido.estado === "Abierto")
                    {
                        pedido.nombres = nombres;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = preciototal;
                        pedido.mediodepago = mediodepago;
                        pedido.estado = estado;
                        let identificador = "editado"
                        const NewOrder = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosJimmy.push(NewOrder);
                        res.status(201).json({msg: 'Pedido editado con exito'});
                    }
                    else
                    {
                        res.status(400).json({err: 'El pedido no puede ser editado porque el estado es cerrado'});
                    }
                }
                else{
                    res.status(204).json({err: "Pedido no encontrado"});
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
                        pedido.nombres = nombres;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = preciototal;
                        pedido.mediodepago = mediodepago;
                        pedido.estado = estado;
                        let identificador = "editado"
                        const NewOrder = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosAlexander.push(NewOrder);
                        res.status(201).json({msg: 'Pedido editado con exito'});
                        
                    }
                    else
                    {
                        res.status(400).json({err: 'El pedido no puede ser editado porque el estado es cerrado'});
                    }
                }
                else{
                    res.status(204).json({err: 'Pedido no encontrado'});
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
                        pedido.nombres = nombres;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = preciototal;
                        pedido.mediodepago = mediodepago;
                        pedido.estado = estado;
                        let identificador = "editado"
                        const NewOrder = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidosJim.push(NewOrder);
                        res.status(201).json({msg: 'Pedido editado con exito'});
                    }
                    else
                    {
                        res.status(400).json({err: 'El pedido no puede ser editado porque el estado es cerrado'});
                    }
                }    
                else{
                    res.status(204).json({err: 'Pedido no encontrado'});
                }
            });
        }
        if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
        {
            pedidos.forEach(pedido => {
                if (pedido.identificador === indice)
                {
                    if (pedido.estado === "Abierto") {
                        pedido.nombres = nombres;
                        pedido.cantidades = cantidades;
                        pedido.preciototal = preciototal;
                        pedido.mediodepago = mediodepago;
                        pedido.estado = estado;
                        let identificador = "editado"
                        const NewOrder = {identificador, nombres, cantidades, preciototal, mediodepago, estado}
                        pedido.nombres.splice(0,2);
                        pedido.cantidades.splice(0,2);
                        pedidos.push(NewOrder);
                        res.status(201).json({msg: 'Pedido editado con exito'});
                    }
                    else
                    {
                        res.status(400).json({err: 'El pedido no puede ser editado porque el estado es cerrado'});
                    }
                }
                else{
                    res.status(204).json({err: 'Pedido no encontrado'});
                }
            });
        }
    }
    else {
        res.status(204).json({err: 'Faltan datos'});
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
                res.status(200).json({msg: 'Estado editado con exito'});
            }
        });
    }
    if(Nombre_Usuario.id === 2)
    {
        pedidosAlexander.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                res.status(200).json({msg: 'Estado editado con exito'});
            }
        });
    }
    if(Nombre_Usuario.id === 3)
    {
        pedidosJim.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                res.status(200).json({msg: 'Estado editado con exito'});
            }
        });
    }
    if(Nombre_Usuario.id != 1 && Nombre_Usuario.id != 2 && Nombre_Usuario.id != 3)
    {
        pedidos.forEach(pedido => {
            if (pedido.identificador === indice)
            {
                pedido.estado = estado;
                res.status(200).json({msg: 'Estado editado con exito'});
            }
        });
    }
});


module.exports = router;


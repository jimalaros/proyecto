const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const { MostrarMediosdePago, RegistrarMediosdePago } = require('../models/mediosdepago.models');

router.get('/', EsAdministrador, (req,res) => {
    res.json(MostrarMediosdePago());
});

router.post('/', EsAdministrador, (req,res) => {
    const mediodepago = req.body;
    if(mediodepago)
    {
        const Nuevo = mediodepago;
        RegistrarMediosdePago(Nuevo);
        res.status(201).json({msg: 'Medio de pago creado con exito'});
    }
    else {
        res.status(204).json({err: 'Faltan campos por llenar'});
    }
});

router.put('/EditarMedioDePago/:id', EsAdministrador, (req, res) => {
    
    const payment = req.body;
    if (payment) 
    {
        const id = Number(req.params.id);
        MostrarMediosdePago().forEach(mediodepago => {
            if(mediodepago.identificador === id)
            {
                mediodepago.mediodepago=payment;
                res.status(200).json({msg: 'Medio de pago editado con exito'});
            }
        });            
    }    
    else 
    {
        res.status(204).json({err: 'Faltan campos por llenar'});
    }
});

router.delete('/EliminarMedioDePago/:id', EsAdministrador, (req, res) => {
    
    const Mediosdepago = MostrarMediosdePago().filter(u => u.id === id);
    if(Mediosdepago)
    {
        const id = Number(req.params.id);
        MostrarMediosdePago().forEach(mediodepago => {
            if(mediodepago.identificador === id)
            {
                MostrarMediosdePago().splice(id,1);
                res.status(200).json({msg:'El medio de pago fue eliminado'});   
            }
        }); 
    }
    else 
    {
        res.status(204).json({err: 'Faltan campos por llenar'});
    }
});

module.exports = router;

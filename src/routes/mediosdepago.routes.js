const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const { MostrarMediosdePago, RegistrarMediosdePago } = require('../models/mediosdepago.models');

router.get('/', EsAdministrador, (req,res) => {
    res.json(MostrarMediosdePago());
});

router.post('/', EsAdministrador, (req,res) => {
    const {mediodepago} = req.body;
    if(mediodepago)
    {
        const payment = MostrarMediosdePago().find(p => p.mediodepago === mediodepago);
        if(!payment)
        {
            RegistrarMediosdePago(mediodepago);
            res.status(201).json({msg:'medio de pago creado con exito'});
        }
        else
        {
            res.status(400).json({err: 'El medio de pago ya se encuentra registrado'});
        }
        
    }
    else res.status(204).json({err: 'Faltan datos'});
});

router.put('/EditarMedioDePago/:id', EsAdministrador, (req, res) => {
    const {mediodepago} = req.body;
    if (mediodepago) 
    {
        const id = Number(req.params.id);
        MostrarMediosdePago().forEach(payment => {
            if(payment.identificador === id)
            {
                payment.mediodepago=mediodepago;
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
    if (!MostrarMediosdePago().some(u => u.identificador == Number(req.params.id))){
        return res.status(400).json("El medio de pago no esta registrado.")}
    else {
        const  payment = MostrarMediosdePago().find( u => u.identificador == Number(req.params.id));
        MostrarMediosdePago().splice(MostrarMediosdePago().lastIndexOf(payment),1);
        res.status(200).json({msg:'Medio de pago eliminado'});
    }

});

module.exports = router;

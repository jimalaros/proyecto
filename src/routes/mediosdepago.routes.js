const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const { MostrarMediosdePago, RegistrarMediosdePago } = require('../models/mediosdepago.models');

router.get('/', EsAdministrador, (req,res) => {
    res.sendStatus(200).json(MostrarMediosdePago());
});

router.post('/', EsAdministrador, (req,res) => {
    const { mediodepago} = req.body;
    if(mediodepago)
    {
        id=MostrarMediosdePago.length+1;
        const Nuevo = {id, mediodepago};
        RegistrarMediosdePago(Nuevo);
        res.sendStatus(201).json({msg: 'Medio de pago creado con exito'});
    }
    else {
        res.sendStatus(204).json({msg: 'Faltan campos por llenar'});
    }
});

router.put('/EditarMedioDePago/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id);
    const { mediodepago } = req.body;
    if (mediodepago) {
        const payment = MostrarMediosdePago().find(p => p.id === id)
            if (payment) {
                payment.mediodepago = mediodepago;
                const Editado = {mediodepago};
                res.sendStatus(200).json(MostrarMediosdePago(Editado));
            }
            else
            {
                res.sendStatus(400).json('Identificador no encontrado en los medios de pago existentes')
            }
        
    } else {
        res.sendStatus(204).json({msg: 'Faltan campos por llenar'});
    }
});

router.delete('/EliminarMedioDePago/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id)
    const Mediosdepago = MostrarMediosdePago().filter(u => u.id != id)
    res.sendStatus(200).json('El medio de pago eliminado: ',Mediosdepago)
});

module.exports = router;

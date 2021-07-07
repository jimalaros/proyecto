const express = require('express');
const router = express.Router();
const {EsAdministrador} = require('../middlewares/Administrador.middleware');
const { MostrarMediosdePago, RegistrarMediosdePago } = require('../models/mediosdepago.models');

router.get('/', EsAdministrador, (req,res) => {
    res.json(MostrarMediosdePago());
});

router.post('/', EsAdministrador, (req,res) => {
    const { mediodepago} = req.body;
    if(mediodepago)
    {
        id=MostrarMediosdePago.length+1;
        const Nuevo = {id, mediodepago};
        RegistrarMediosdePago(Nuevo);
    }
    
});

router.put('/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id);
    const { mediodepago } = req.body;
    if (mediodepago) {
        const payment = MostrarMediosdePago().find(p => p.id === id)
            if (payment) {
                payment.mediodepago = mediodepago;
                const Editado = {mediodepago};
                res.json(MostrarMediosdePago(Editado));
            }
            else
            {
                res.json('Identificador no encontrado en los medios de pago existentes')
            }
        
    } else {
        res.status(204).json({msg: 'Faltan campos por llenar'});
    }
});

router.delete('/:id', EsAdministrador, (req, res) => {
    const id = Number(req.params.id)
    const Mediosdepago = MostrarMediosdePago().filter(u => u.id != id)
    res.json('El medio de pago eliminado: ',Mediosdepago)
});

module.exports = router;
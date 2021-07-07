const MediosDePago =  [
    {
        identificador: 1,
        mediodepago: "Efectivo"
    },
    {
        identificador: 2,
        mediodepago: "Datafono"
    },
    {
        identificador: 3,
        mediodepago: "Nequi"
    },
    {
        identificador: 4,
        mediodepago: "BANCOLOMBIA"
    }
];

const MostrarMediosdePago = () => {
    return MediosDePago;
}

const RegistrarMediosdePago = (mediodepago) => {
    const Nuevo = {identificador: MediosDePago.length + 1, mediodepago};
    MediosDePago.push(Nuevo);
}

module.exports = { MostrarMediosdePago, RegistrarMediosdePago };
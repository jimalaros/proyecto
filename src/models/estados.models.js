const Estados =  [
    {
        identificador: 1,
        estado: "Pendiente"
    },
    {
        identificador: 2,
        estado: "Confirmado"
    },
    {
        identificador: 3,
        estado: "En preparación"
    },
    {
        identificador: 4,
        estado: "Enviado"
    },
    {
        identificador: 5,
        estado: "Entregado"
    }
];

const MostrarEstados = () => {
    return Estados;
}

module.exports = { MostrarEstados };
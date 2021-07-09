const { mostrarProductos, registrarProductos } = require('./productos.models');

function Precio (n, nombres, cantidades)
{   
    precios=[];
    for (let index = 0; index < n; index++) {
        const precio = mostrarProductos().find(u => u.nombre === nombres[index]);
        precios.push(precio);
    }

    totales=[]
    items=[]
    for (let index = 0; index < n; index++) {
        const b = cantidades[index];
        totales.push(b);
    }
    
    prices=[];
    for (let index = 0; index < n; index++) {
        const k = precios[index];
        prices.push(k);
    }

    let preciototal=0;
    for (let d = 0; d < n; d++) {
        let Q = totales[d]*prices[d].precio;
        preciototal=preciototal+Q;    
    }

    return preciototal;

}
module.exports = {Precio};

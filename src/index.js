const express = require('express');
const basicAuth = require('express-basic-auth');
const {autorización} = require('./middlewares/usuarioexistente.middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {EsAdministrador} = require('./middlewares/Administrador.middleware')

const pedidoRoutes = require('./routes/pedidos.routes');
const usuarioRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');
const modelosdepagoRoutes = require('./routes/mediosdepago.routes');
const app = express();

const swaggerOptions = require('./utils/swagger');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.use('/usuarios', usuarioRoutes);

app.use(basicAuth({ authorizer: autorización }));

app.use('/pedidos', pedidoRoutes);

app.use('/productos', productosRoutes);

app.use('/mediosdepago', modelosdepagoRoutes);

app.listen(5000, () => { console.log('Escuchando en el puerto 5000') });

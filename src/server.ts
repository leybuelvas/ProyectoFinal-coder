import express, {Application, NextFunction} from 'express';
import {routerProducts} from './routes/routerProductos';
import {routerCarrito} from './routes/routerCarrito';

const app: Application = express();
export const IS_ADMIN: boolean = true;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);

/* Este es un middleware que se ejecuta cuando no se encuentra la ruta. */
app.use((req, res)=> {
    res.status(400).send({
        'error': -2,
        'description': `Ruta ${req.originalUrl} método ${req.method} no implementada.`
    });

});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});



const PORT = process.env.PORT || 8080;
/* Creando un servidor y escuchando el puerto 8080. */
const server = app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}`);
});
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});

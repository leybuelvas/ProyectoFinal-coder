import { Router } from 'express';
import { Contenedor } from '../container/contenedor'
import { notFoundMessage as productNotFoundMessage } from './routerProductos'

export const routerCarrito: Router = Router();

routerCarrito.post('/', [], async (req, res) => {
    const contenedor = new Contenedor('./db/carritos.json');
    const carrito = await contenedor.create({ 'timestamp': Date.now(), 'productos': [] });
    return res.status(201).json(carrito);
});


routerCarrito.delete('/:id',[], async (req, res) => {
    const contenedor = new Contenedor('./db/carritos.json');
    const id = +req.params.id;
    const deletedId = await contenedor.deleteById(id);
    return (deletedId !== -1)
        ? res.json({'mensaje': `Carrito con id: '${ id }' fue eliminado`})
        : res.status(404).json(notFoundMessage(id));
});

routerCarrito.get('/:id/productos', [],async (req, res) => {
    const contenedor = new Contenedor('./db/carritos.json');
    const id = +req.params.id;
    const carrito = await contenedor.getById(id);
    if (!carrito) return res.status(404).json(notFoundMessage(id));
    return res.json(carrito.productos);
});


routerCarrito.post('/:id/productos', [], async (req, res) => {
    const contenedorCarrito = new Contenedor('./db/carritos.json');
    const contenedorProductos = new Contenedor('./db/productos.json');

    const id_carrito = +req.params.id;
    const { id_producto } = req.body;

     const carrito = await contenedorCarrito.getById(id_carrito);
      if (!carrito) return res.status(404).json(notFoundMessage(id_carrito));

      if(carrito.productos.find(producto => producto.id === id_producto))
          return res.status(400).json({'mensaje': `El carrito ya tiene el producto con el id: '${id_producto}'`});

     const producto = await contenedorProductos.getById(id_producto);
     if (!producto)
         return res.status(404).json(productNotFoundMessage(id_producto));

     carrito.productos?.push(producto);

     await contenedorCarrito.update(carrito);
     return res.status(201).json(carrito);
});

routerCarrito.delete('/:id/productos/:idProd', [], async (req, res) => {
    const contenedor = new Contenedor('./db/carritos.json');
    const id_carrito = +req.params.id;
    const idProd = +req.params.idProd;

    const carrito = await contenedor.getById(id_carrito);
    if (!carrito)
        return res.status(404).json(notFoundMessage(id_carrito));

    const filteredProductos = carrito.productos?.filter(producto => producto.id !== idProd)
    if(carrito.productos.length === filteredProductos.length)
        return res.status(400).json({'mensaje': `El carrito no tiene el producto con id: '${ idProd }'`});

    carrito.productos = filteredProductos;
    await contenedor.update(carrito)
    return res.json({'mensaje': `El producto '${idProd}' fue eliminado del carrito '${id_carrito}'`});
});


const notFoundMessage = (id) => {
    return {'mensaje': `No se encontró el carrito con el id: '${id}'`}
}

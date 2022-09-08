import { Router } from 'express';
import { isadminMiddleware } from '../middlewares/Isadmin.middleware';
import { Contenedor } from '../container/contenedor'
export const routerProducts: Router = Router();


/* Esta es una ruta que obtendrá todos los productos de la base de datos (archivo json). */
routerProducts.get('/', [], async (req, res) => {
    const contenedor = new Contenedor('./db/productos.json');
    const productos = await contenedor.getAll();
    return res.json(productos);
});


/* Esta es una ruta que obtendrá un producto por id. */
routerProducts.get('/:id',[] , async (req, res) => {
    const contenedor = new Contenedor('./db/productos.json');
    const id = +req.params.id;
    const producto = await contenedor.getById(id)
    return (producto)
        ? res.json(producto)
        : res.status(404).json(notFoundMessage(id));
});


/* Esta es una ruta que creará un nuevo producto en la base de datos (archivo json). */
routerProducts.post('/', [ isadminMiddleware ], async (req, res) => {
    const contenedor = new Contenedor('./db/productos.json');
    const data = {...req.body, 'timestamp': Date.now()};
    const producto = await contenedor.create(data);
    return res.status(201).json(producto);
});

routerProducts.put('/:id', [ isadminMiddleware ] ,async (req, res) => {
    const contenedor: Contenedor = new Contenedor('./db/productos.json');
    const  id  = +req.params.id;
    const productoToUpdate = await contenedor.getById(id);
    if(!productoToUpdate)
        return res.status(404).json(notFoundMessage(id));

    if(req.body.id && id !== req.body.id)
        return res.status(400).json({'mensaje': `El id del producto no coincide`});

    const data = { ...productoToUpdate, ...req.body, id };
    const producto = await contenedor.update(data);
    return (producto !== -1)
        ? res.status(200).json(producto)
        : res.status(404).json(notFoundMessage(id));
});

/* Esta es una ruta que eliminará un producto por id. */
routerProducts.delete('/:id', [ isadminMiddleware ], async (req, res) => {
    const contenedor = new Contenedor('./db/productos.json');
    const id  = +req.params.id;
    const deletedId = await contenedor.deleteById(id);
    return (deletedId !== -1)
        ? res.json({'mensaje': `Producto con id: '${ id }' ha sido eliminado con exito`})
        : res.status(404).json(notFoundMessage(id));
});

export const notFoundMessage = (id) => {
    return {'mensaje': `Producto con id: '${ id }' no encontrado`};
}


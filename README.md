Proyecto Final-Coderhouse
------
>Proyecto Final-Primera entrega Avance de la aplicación eCommerce Backend
correspondiente a la primera entrega del proyecto final.

Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que
implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El
servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base
'/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y
process.env.PORT para producción en heroku. La consigna solicitaba subir el proyecto a glitch pero consultando con el profesor 
heroku fue otra opción. 

Aspectos a incluir en el entregable:
1. El router base '/api/productos' implementará cuatro funcionalidades:


   a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id
   (disponible para usuarios y administradores)


   b. POST: '/' - Para incorporar productos al listado (disponible para administradores)

   c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)

   d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)


2. El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:

   a. POST: '/' - Crea un carrito y devuelve su id.

   b. DELETE: '/:id' - Vacía un carrito y lo elimina.

   c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

   d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

   e. DELETE: '/:id/productos/:idProd' - Eliminar un producto del carrito por su id de carrito y de
   producto


3. Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema
   de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de
   recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error :
   -1, descripcion: ruta 'x' método 'y' no autorizada }


5. Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion, código,
   foto (url), precio, stock.


6. El carrito de compras tendrá la siguiente estructura:
   id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código,
   foto (url), precio, stock }


7. El timestamp puede implementarse con Date.now()


8. Realizar la persistencia de productos y del carrito de compras en el filesystem.

>A tener en cuenta:
Para realizar la prueba de funcionalidad hay dos opciones:
   a. Probar con postman cada uno de los endpoints (productos y carrito) y su operación en
   conjunto.

----

Se debe tener instalado __nodemon__
```
npm install -g nodemon
```
Para poder correr los comandos se deben tener abiertas 2 terminales en la carpeta del proyecto.
```
npm run start:dev y npm run serve:dev
```
Para generar el build:
```
npm run build
```
Para ejecutar en modo produccion:
```
npm start
```

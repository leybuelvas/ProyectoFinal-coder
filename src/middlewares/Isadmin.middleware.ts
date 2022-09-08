import {NextFunction, Request, Response} from 'express';
import {IS_ADMIN} from '../server';

/**
 * Comprueba si el usuario es un administrador, si no, devuelve un error 403
 * @param {Request} req - Solicitud: el objeto de la solicitud.
 * @param {Response} res - Respuesta: el objeto de respuesta.
 * @param {NextFunction} next - Esta es una función a la que llama cuando desea pasar el control a la siguiente función de
 * middleware en la pila.
 * @returns Una función que es un middleware que verifica si el usuario es un administrador.
 */
export const isadminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!IS_ADMIN)
        return res.status(403).json({
            'error': -1,
            'descripcion': `ruta '${ req.originalUrl }' método '${ req.method }' no autorizada`
        });

    next();
}

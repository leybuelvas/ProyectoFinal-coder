import fs from 'fs';

export class Contenedor {
    private nombreArchivo: string;

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    /**
     * La función toma una matriz de objetos y los escribe en un archivo.
     * @param objs - Los objetos a guardar.
     */
    async save(objs) {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objs,null,2), 'utf-8');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Crea un nuevo objeto, lo agrega a la matriz de objetos y luego guarda la matriz de objetos
     * @param data - Los datos a guardar.
     * @returns El nuevo objeto de datos.
     */
    async create (data) {
        const objs = await this.getAll();
        let newId = objs.length === 0 ? 1 : objs[objs.length - 1].id + 1;
        const newData = {...data, id: newId};
        objs.push(newData);
        await this.save(objs);
        return newData;
    }

    /**
     * Obtiene todos los objetos, encuentra el índice del objeto con la identificación dada, actualiza el objeto en ese
     * índice y guarda los objetos actualizados
     * @param data - Los datos a actualizar.
     * @returns El objeto actualizado
     */
    async update(data) {
        const objs = await this.getAll();
        const itemIndex = objs.findIndex(obj => +obj.id === data.id);
        if (itemIndex === -1) {
            return itemIndex
        }
        objs[itemIndex] = data;
        await this.save(objs);
        return objs[itemIndex];
    }

    /**
     * Devuelve el primer objeto de la matriz que tiene una propiedad de identificación que coincide con el parámetro de
     * identificación
     * @param id - El id del objeto a obtener.
     * @returns El objeto con la identificación que coincide con la identificación pasada.
     */
    async getById(id) {
        const objs = await this.getAll();
        return objs.find(obj => obj.id == id) || null;
    }

    /**
     * La función lee el archivo y devuelve el objeto JSON analizado.
     * @returns Una matriz de objetos.
     */
    async getAll() {
        try {
            const objs = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }


    /**
     * Elimina un objeto de la base de datos por su id
     * @param id - El id del objeto a eliminar.
     * @returns El id del objeto eliminado.
     */
    async deleteById(id) {
        const objs = await this.getAll();
        const newObjs = objs.filter(obj => obj.id != id);
        if(objs.length === newObjs.length) {
            return -1;
        }
        await this.save(newObjs);
        return id;
    }
}

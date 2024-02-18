const { storageModel } = require('../models/index');
const fs = require("fs")
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`


/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req,res) => {
    try {
        const data = await storageModel.find({})
        res.send(data);
    } catch (e){
        handleHttpError(res,"Error en GetItems", 403)
    }
}

/**
 * Obtener detalles de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req,res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const data = await storageModel.findOne({ _id: id }); // Utiliza findOne con el criterio de búsqueda adecuado
        res.send({ data });
    } catch (e){
        console.log(e)
        handleHttpError(res,"Error en traer al item", 403)
    }
}

/**
 * Inserta un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) => {
    const { body, file } = req
    console.log(file)
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`

    }
   const data = await storageModel.create(fileData)
    res.send({data})
}


/**
 * Elimina un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const dataFile = await storageModel.findOne({ _id: id }); // Utiliza findOne con el criterio de búsqueda adecuado
        // Verificar si dataFile es null
        if (!dataFile) {
            return handleHttpError(res, "Archivo no encontrado", 404);
        }

        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        
        const data = {
            filePath,
            deleted: 1
        };

        res.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, "Error al eliminar archivo", 500);
    }
};



module.exports = {getItems, getItem, createItem, deleteItems};
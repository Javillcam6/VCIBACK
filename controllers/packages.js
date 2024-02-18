const { matchedData } = require('express-validator');
const { packageModel } = require('../models/index');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req,res) => {
    try{
        const user = req.user
        const data = await packageModel.find({})
        res.status(200).send({ data: data, user: user });
    } catch(e){
        handleHttpError(res,"Error en GetItems", 403)
    }
}

/**
 * Obtener detalles de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const data = await packageModel.findOne({ _id: id }); // Utiliza findOne con el criterio de búsqueda adecuado
        res.send({ data });
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR AL TRAER EL ITEM");
    }
};

/**
 * Inserta un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req,res) => {
    try{
        const body = matchedData(req)
        const data = await packageModel.create(body)
        res.send({data})
    } catch(e){
        handleHttpError(res,"Error en CreateItem", 403)
    }
}

/**
 * Actualiza un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async (req,res) => {
    try{
        const {id, ...body} = matchedData(req)
        const data = await packageModel.findOneAndUpdate(id,body)
        res.send({data})
    } catch(e){
        handleHttpError(res,"Error en updateItems", 403)
    }
}

/**
 * Elimina un registro de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req,res) => {
    try{
        // req = matchedData(req)
        const {id} = req.params;
        const data = await packageModel.deleteOne({_id:id})
        res.send({data})
    } catch (e) {
        console.log(e)
        handleHttpError(res,"ERROR AL ELIMINAR EL ITEM")
    }
}

module.exports = {getItems, getItem, createItem, updateItems, deleteItems};
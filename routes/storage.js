const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage')
const {createItem, getItems, getItem, deleteItems} = require("../controllers/storage")
const {validatorGetItem} = require('../validators/storage')


//Se conectara a => http://localhost:4001/api/storage/

//Ruta que nos enlista los items
router.get('/', getItems)
//Ruta que obtiene los detalles del item
router.get('/:id', validatorGetItem , getItem)

//Eliminar un registro o item
router.delete('/:id', validatorGetItem,  deleteItems)
//Publicar o insertar item
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router
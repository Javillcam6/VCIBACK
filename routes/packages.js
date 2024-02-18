const express = require('express');
const router = express.Router();
// const customHeader = require('../middleware/customHeader');
// const authMiddlware = require('../middleware/session')
// const checkRol = require('../middleware/rol')
const { validatorCreateItem, validatorGetItem } = require("../validators/packages")
const { getItems, createItem, getItem, updateItems, deleteItems } = require('../controllers/packages')




//Ruta de cursos http://localhost/packages GET, POST, DELETE, PUT.

//Ruta que nos enlista los items
router.get('/', getItems)
//Ruta que obtiene los detalles del item
router.get('/:id', validatorGetItem, getItem)
//Ruta que crea itemss
router.post('/', validatorCreateItem, createItem)
//Actualizar un registro o item
router.put('/:id', validatorGetItem, validatorCreateItem, updateItems)
//Eliminar un registro o item
router.delete('/:id', validatorGetItem, validatorCreateItem,  deleteItems)

module.exports = router
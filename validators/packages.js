const {check} = require("express-validator")
const { validateResults } = require("../utils/handleValidators.js")

const validatorCreateItem = [
    check("userName").exists().notEmpty().isLength({min:5, max: 50}),
    check("courseName").exists().notEmpty(),
    check("price").exists().notEmpty(),
    check("label").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => {
      return validateResults(req, res, next) // Respondemos ante una peticion gracias al Middleware
    }
]

const validatorGetItem = [
  check("mediaId").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next) // Respondemos ante una peticion gracias al Middleware
  }
]


module.exports = { validatorCreateItem, validatorGetItem }  //Importamos desde routes

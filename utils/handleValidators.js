const { validationResult } = require("express-validator")

const validateResults = (req,res, next) => {
    try {
        validationResult(req).throw()
        return next ()  // Si no existe un error en la validacion decimos que continue hacia el controlador
    } catch (err) {   // Si existe un error, crachea o revienta y retorna un error 403
        res.status(403)
        res.send({ errors: err.array()})
    }
}

module.exports = {validateResults}
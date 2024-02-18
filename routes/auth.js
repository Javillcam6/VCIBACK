const { Router } = require ("express")
const router = Router()
const {loginCtrl, registrerCtrl} = require("../controllers/auth")
const {validatorRegister, validatorLogin} = require("../validators/auth")

// http://localhost:4001/api/auth/login
//// http://localhost:4001/api/auth/register

/**
 * Ruta para gistrar usuario
 */
router.post("/register", validatorRegister, registrerCtrl);


/**
 * Ruta para logear un usuario
 */
router.post("/login", validatorLogin, loginCtrl)


module.exports = router
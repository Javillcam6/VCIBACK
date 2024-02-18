const bcryptjs = require ("bcryptjs")


/**
 * Contrasenias sin encriptar: Ejemplo: Hola123
 * @param {*} passwordPlain 
 */
const encrypt = async(passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 16)    ///hash encripta el string//obtienes la version encriptada de la contrasenia
    return hash;
}

/**
 * Pasar contrasenia sin encriptar y pasar contrasenia encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}   


module.exports = {encrypt, compare}
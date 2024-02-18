const jsonwebtoken = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
// const getProperties = require("./handlePropertiesEngine")  //Importamos funcion

// const propertiesKey = getProperties()  //TRAEMOS LA FUNCION PARA DETERMINAR LOS CAMBIOS DE DB DEPENDIENDO EL MOTOR DE BUSQUEDA SI ES NOSQL O MYSQL

/**
 * Pasamos el objeto del usuario (name, password)
 * //FIRMAMOS
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign(
        {
       _id: user._id, // ESTO ES EL PAYLOAD   // AQUI SE UTILIZAR .ID SI ES MYSQL O ._ID SI ES NOSQL, SE SUSTITULLE SOLO POR LA FUNCION
        role: user.role
        },
        JWT_SECRET,
        {
        expiresIn:"1h"
        }
    )
    return sign
}


/**
 * Debemos de pasar el Token de session JWT
 * VERIFICAMOS FIRMA
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async(tokenJwt) => {
    try {
        return jsonwebtoken.verify(tokenJwt, JWT_SECRET)
    } catch(e) {
        return null
    }

}

module.exports = {tokenSign, verifyToken}

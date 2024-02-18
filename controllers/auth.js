const { matchedData } = require("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError")
const {userModel} = require("../models")


// /**
//  * Controlador encargado en registrar usuario
//  */

// const registrerCtrl = async (req, res) => {
//  try{
//     {
//         req = matchedData(req);
//         const password = await encrypt (req.password)
//         const body = {...req, password};
//         const dataUser = await userModel.create(body)
    
//         const data = {
//           token: await tokenSign(dataUser),
//           user:dataUser
//         }
    
//         res.send({ data });
//       }
//  } catch(e) {
//     handleError(res, "ERROR EN REGISTRAR USUARIO")
//  }
// }


/**
 * Controlador encargado en logear un usuario
 * @param {*} req 
 * @param {*} res 
 */
// const loginCtrl = async (req, res) => { 
//     try{
//         req = matchedData(req);  //Debe de curar la data a traves del MatchedData para que solo use email y password
//         const user = await usersModel.findOne({email:req.email})
//         if(!user) {
//             handleHttpError(res, "EL USUARIO NO EXISTE", 404)
//             return
//         }
//         const hashPassword = user.password;
//         const check = await compare(req.password, hashPassword)
//         if(!check) {
//             handleHttpError(res, "PASSWORD INCORRECTO", 401)
//             return
//         }

//         user.set('password', undefined, {strict:false}) //La propiedad de password no se mostrara cuando se envie
//         const data = {
//             token: await tokenSign(user) //Imprime el token al momento de publicarlo por postman
//         }
//         res.send({data})

//     } catch(e) {
//         handleHttpError(res, "ERROR EN EL LOGIN DEL USUARIO")
//     }
// }


//Registra un usuario
const registrerCtrl = async (req, res) => {
    try{
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await userModel.create(body)
        // data.set('password', undefined, {strict:false})
        const data = {
            user: dataUser,
            token: await tokenSign(dataUser)
        }
        
        res.send({ data });
    } catch(e){
        handleHttpError(res, "ERROR EN REGISTRAR USUARIO")
    }
}

///Crea un usuario
const loginCtrl = async (req, res) => {
    try{
        req = matchedData(req)
        const user = await userModel.findOne({email:req.email})
        if(!user) {
            handleHttpError(res, "EL USUARIO NO EXISTE", 404)
            return
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
            if(!check) {
            handleHttpError(res, "PASSWORD INCORRECTO", 401)
            return
            }

            user.set('password', undefined, {strict:false}) //La propiedad de password no se mostrara cuando se envie
            const data = {
            token: await tokenSign(user), //Imprime el token al momento de publicarlo por postman
            user
            }
            res.send({data})

    } catch (e) {
        handleHttpError(res, "ERROR EN EL LOGIN DEL USUARIO")
    }
}

module.exports = {registrerCtrl, loginCtrl}
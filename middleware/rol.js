const {handleHttpError} = require("../utils/handleError")
/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
 try{
    const { user } = req;
    console.log({user})
    const rolesByUser = user.role;  //TODO ["user"] indica que el usuario por defecto tendra un rol de usuario al registrarse

    //Tiene el rol valor ["admin"] a conitnuacion verifico si el rol es valido o existe
    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))  //Devuelve true o false
    if(!checkValueRol) {
        handleHttpError(res,"El usuario no tiene permisos de adm", 403)
        return
    }

    next()
 } catch (e) {
    handleHttpError(res,"OCURRIO UN ERROR CON LOS PERMISOS", 403)
    console.log(e)
 }

}

module.exports = checkRol
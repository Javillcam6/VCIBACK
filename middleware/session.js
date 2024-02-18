const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddlware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return handleHttpError(res, "Necesitas una sesión", 401);
        }

        const token = req.headers.authorization.split(" ").pop(); 
        const dataToken = await verifyToken(token);
        
        if (!dataToken) {
            return handleHttpError(res, "NOT PAYLOAD_DATA", 401);
        }

        if (!dataToken._id) {
            return handleHttpError(res, "ERROR ID TOKEN", 401);
        }

        const user = await userModel.findById(dataToken);
        if (!user) {
            return handleHttpError(res, "Usuario no encontrado", 404);
        }

        req.user = user;
        next();

    } catch (e) {
        handleHttpError(res, "Error en la sesión", 500);
        console.log(e);
    }
};

module.exports = authMiddlware;

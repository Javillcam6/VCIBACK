const handleHttpError = (res, message = "Algo sucedio, corrige el error", code = 403) => {
    res.status(code);
    res.send({error:message})
}

module.exports = {handleHttpError}
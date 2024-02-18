const handleHttpError = (res, message = "Existe una falla", code = 403) => {
    res.status(code);
    res.send({error:message})
}

module.exports = {handleHttpError}
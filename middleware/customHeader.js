const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === 'api-publica') {
            next();
        } else {
            res.status(403).send({ error: "API_KEY NO ES CORRECTO" });
        }
    } catch (e) {
        res.status(403).send({ error: "Existe un error en el CUSTOM HEADER" });
    }
}

module.exports = customHeader;

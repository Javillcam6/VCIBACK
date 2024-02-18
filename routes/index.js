const { Router } = require("express");
const fs = require("fs");
const router = Router();

const PATH_ROUTES = __dirname;  //Nos otorga la direccion en la que se encuentra en forma de array

const removeExtension = (fileName) => {  // /Eliminamos el la extension .js de la direccion 
    return fileName.split('.').shift();
}

// Este directorio devuelve un array.
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        const modulePath = require.resolve(`./${file}`);  //Resolvemos la ruta completa del modulo por medio del require.resolve
        const middleware = require(modulePath); //El modulo exporta un middleware, funcion u cualquier otro tipo de objeto.

        //Verificamos si el modulo exporta una funcion
        if (typeof middleware === 'function') {
            router.use(`/${name}`, middleware);  // La ruta sera accesible bajo la URL de la app.
        } else {
            console.error(`Error: Module ${modulePath} no exporta una función de middleware válida`);
        }
    }
});

module.exports = router;




const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const pathStorage = `${__dirname}/../storage`
        callback(null, pathStorage)
    }, 
    filename: function(req, file, callback){
        //Archivos con extension mifoto.png micv.pdf etc...
        const ext = file.originalname.split(".").pop()      //devuelve ["Nombre del archivo" ".png"]
        const filename= `file-${Date.now()}.${ext}`  //Devuelve nombre de archivo.....png o cualquier extension de archivo
        callback(null, filename)
    }
})

const uploadMiddleware = multer({storage})

module.exports = uploadMiddleware
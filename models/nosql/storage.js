const mongoose = require("mongoose")


//Creamos un esquema de datos por medio de Schema
const storageScheme = new mongoose.Schema (
    {
        url: {
            type: String
        },
        filename:{
            type: String,
        }

    },
    {
        timestamps:true, //TODO LO RELACIONADO A createAt, updateAt
        versionKey: false
    }
)

module.exports = mongoose.model("storages", storageScheme)
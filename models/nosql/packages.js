const mongoose = require("mongoose")


// Creamos un esquema de datos por medio de Schema
const packagesScheme = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, // TODO LO RELACIONADO A createdAt, updatedAt
        versionKey: false,
    }
);


module.exports = mongoose.model("packages", packagesScheme)
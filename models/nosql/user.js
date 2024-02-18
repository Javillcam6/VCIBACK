const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: { 
            type: Number
        },
        email: {
            type: String,
            sparse: true
        },
        password: {
            type: String,
        },
        role:  { 
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,  // CREA  createdAt, updatedAt. (Fecha de creacion y actualizacion)
        versionKey: false
    },
    )

    module.exports = mongoose.model('users',userSchema)
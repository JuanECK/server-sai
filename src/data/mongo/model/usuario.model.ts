
import mongoose from "mongoose";

const esquemaUsuario = new mongoose.Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    email:{
        type:String,
        required:[true, 'El E-mail es requerido'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'La contraseña es requerida']
    },
    claveUnica:{
        type:String,
        required:[true, 'La contraseña es requerida'],
        unique:true
    }
})


export const ModeloUsuario = mongoose.model('User', esquemaUsuario)
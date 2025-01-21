
import { DataTypes } from 'sequelize';
import { db } from '../db/coneccion';

export const Usuario = db.define('Usuario',{
    Id_User:{
        type:DataTypes.INTEGER,
    },
    Nombre_Completo:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    }
})

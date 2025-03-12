
import { DataTypes, Model, BuildOptions, Sequelize  } from 'sequelize';
import { db } from '../db/coneccion';
// const sequelize = new Sequelize('sqlite::memory:');

class UsuarioModelo extends Model {
    public Id_User!: number;
    public Nombre_Completo!: string;
    public Area!: string;
    public Id_Perfil!: string;
    public Usuario!: string;
    public Contrasenia!: string;
    public Estatus!: string;
    public Clave_Usuario!: string;
    public createAt!: string;
    public updateAt!: string;
}

UsuarioModelo.init(
    {
        Id_User:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:true,
        },
        Nombre_Completo:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Area:{
            type:DataTypes.STRING,
        },
        Id_Perfil:{
            type:DataTypes.STRING,
        },
        Usuario:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Contrasenia:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Estatus:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Clave_Usuario:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        createAt:{
            type:DataTypes.STRING,
        },
        updateAt:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },
    // // parametros de configuracion
    {
        sequelize:db,
        timestamps: false,
        tableName: 'Usuario',
    },

)

export default UsuarioModelo;




// const UsuarioModelo = sequelize.define('Usuario',{
//     // atributos de la tabla
//     Id_User:{
//         type:DataTypes.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//         allowNull:true,
//     },
//     Nombre_Completo:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     Area:{
//         type:DataTypes.STRING,
//     },
//     Id_Perfil:{
//         type:DataTypes.STRING,
//     },
//     Usuario:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     Contrasenia:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     Estatus:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     Clave_Usuario:{
//         type:DataTypes.STRING,
//         allowNull:false,
//     },
//     createAt:{
//         type:DataTypes.DATE,
//     },
//     updateAt:{
//         type:DataTypes.DATE,
//         allowNull:true,
//     },
// },
// // parametros de donfiguracion
// {
//     timestamps: false,
//     tableName: 'Usuario',
//   },

// )

// export default UsuarioModelo;
// -------------------------------------------------------
// -------------------------------------------------------
// Nombre: conexion.ts
// Autor: Juan Guadalupe Gonzalez Soto
// Fecha: 21/Febrero/2025
// Descripcion: Archivo  de conexion a la base de datos
// Modiciaciones: 
// -------------------------------------------------------
// -------------------------------------------------------

//---- Dependencias de la conexion.ts
import { Sequelize } from 'sequelize';
import  mssql  from 'mssql'
import { envs } from '../../config/envs';

    interface OptionsMsql {
        host:string,
        user:string,
        password:string,
        database:string,
    }
    export class MySqlConnect {

        static async connect( options:OptionsMsql ) {
            const { host, user, password, database } =  options;
            
            const sequelize = new Sequelize(
                database, 
                user, 
                password,
                {
                host,
                dialect:'mysql',
                // logging:false
                }
             )

                try {
                    await sequelize.authenticate();
                    
                    console.log('conectado DB')
                    return true

                } catch (error) {
                    console.log('Error con la coneccion de MySql');
                    throw error;
                }

            }

    }


    interface OptionsSql {
        host:string,
        user:string,
        password:string,
        database:string,

    }
    export class SqlSerConnect {

        static async connect( options:OptionsSql ) {
            const { host, user, password, database } =  options;
            
            const sequelize = new Sequelize(
                database, 
                user, 
                password,
                {
                host,
                port:1433,
                dialect:'mssql',
                dialectOptions:{
                    instanceName:'DESARROLLO'
                }
                // logging:false
                }
             )

                try {
                    await sequelize.authenticate();
                    
                    console.log('conectado DB')
                    return true

                } catch (error) {
                    console.log('Error con la coneccion de SqlServer');
                    throw error;
                }

            }

    }


const Options = {
     user: envs.MSQL_USER,
     password: envs.MSQL_PASSWORD,
     database: envs.MSQL_DATABASE,
     server: envs.MSQL_HOST,
     port: 1433, 
     options: {
       encrypt: true, // for azure
       trustServerCertificate: true // change to true for local dev / self-signed certs
     }
 }

export async function getConnect(){

    try {
        return await mssql.connect(Options)
        
    } catch (error) {
        console.log(error)
    }
    }

export { mssql }

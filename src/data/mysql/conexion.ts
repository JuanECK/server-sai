
import { Sequelize } from 'sequelize';

interface Options {
        host:string,
        user:string,
        password:string,
        database:string,
    }
    export class MySqlConnect {

        static async connect( options:Options ) {
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


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



// import mysql from 'mysql2/promise';

// interface Options {
//     host:string,
//     user:string,
//     password:string,
//     database:string,
// }

// export class MySqlConnect {

// static async connect( options:Options ) {
//     const { host, user, password, database } =  options;

//         try {
            
//             await mysql.createConnection(
//                 {

//                     host,
//                     user,
//                     password,
//                     database,

//             } 
//         )

//         console.log('conectado DB')
//         return true

//         } catch (error) {
//             console.log('Error con la coneccion de MySql');
//             throw error;
//         }

//     }
//     //   static async disconnect(){
//     //     await mysql.end;
//     //   }

// }


// const db = mysql.createConnection(
//     {
//         host:'',
//         user:'',
//         password:'',
//         database:'',
//     }
// );

// db.connect((error) =>{
//     if(error){
//         throw error
//     }
//     console.log('base de datos coectada')
// })
import mysql from 'mysql2';

interface Options {
    host:string,
    user:string,
    password:string,
    database:string,
}

export class MySqlConnect {

static async connect( options:Options ) {
    const { host, user, password, database } =  options;

        try {
            
            await mysql.createConnection( 
                {

                    host:'',
                    user:'',
                    password:'',
                    database:'',

            } 
        )

        return true

        } catch (error) {
            console.log('Error con la coneccion de MySql');
            throw error;
        }

    }

}


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
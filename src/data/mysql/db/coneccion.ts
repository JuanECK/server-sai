
import { Sequelize } from 'sequelize';
import { envs } from '../../../config';
import  { createConnection, createPool }  from 'mysql2/promise';



// export const db = createConnection({
//     host:envs.MSQL_DATABASE, 
//     user:envs.MSQL_USER,
//     password:envs.MSQL_PASSWORD,
//     database:envs.MSQL_DATABASE,
// })

// const config = {
//     host:envs.MSQL_DATABASE, 
//     user:envs.MSQL_USER,
//     password:envs.MSQL_PASSWORD,
//     database:envs.MSQL_DATABASE,
// }

// export const db = createPool(config);



    export const db  = new Sequelize(
        envs.MSQL_DATABASE, 
        envs.MSQL_USER,
        envs.MSQL_PASSWORD,
        
            {
            host: envs.MSQL_HOST,
            dialect:'mysql',
            // logging:false
            define: {
                timestamps: false
            },
            }
            
    )
    

        
        
        
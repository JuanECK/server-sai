
import { Sequelize } from 'sequelize';
import { envs } from '../../../config';
import  { createConnection, createPool }  from 'mysql2/promise';

    export const db  = new Sequelize(
        envs.SQL_SER_DATABASE, 
        envs.SQL_SER_USER,
        envs.SQL_SER_PASSWORD,
        
            {
            host: envs.SQL_SER_HOST,
            dialect:'mssql',
            // logging:false
            define: {
                timestamps: false
            },
            }     
    )


        
        
        
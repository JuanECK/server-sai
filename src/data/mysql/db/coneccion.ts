
import { Sequelize } from 'sequelize';
import { envs } from '../../../config';




    export const db  = new Sequelize(
                envs.MSQL_DATABASE, 
                envs.MSQL_USER,
                envs.MSQL_PASSWORD,
                    {
                    host: envs.MSQL_HOST,
                    dialect:'mysql',
                    // logging:false
                    }
            )
    

        
        
        
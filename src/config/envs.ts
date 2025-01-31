import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get( 'PORT' ).required().asPortNumber(),
  
  JWT_SEED: get( 'JWT_SEED' ).required().asString(),

  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  MSQL_HOST: get('MSQL_HOST').required().asString(),
  MSQL_USER: get('MSQL_USER').required().asString(),
  MSQL_PASSWORD: get('MSQL_PASSWORD').required().asString(),
  MSQL_DATABASE: get('MSQL_DATABASE').required().asString(),

  
  SQL_SER_HOST: get('SQL_SER_HOST').required().asString(),
  SQL_SER_USER: get('SQL_SER_USER').required().asString(),
  SQL_SER_PASSWORD: get('SQL_SER_PASSWORD').required().asString(),
  SQL_SER_DATABASE: get('SQL_SER_DATABASE').required().asString(),


}




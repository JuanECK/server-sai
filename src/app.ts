import { envs } from './config/envs';
import { MongoDatabase, MySqlConnect, getConnect, mssql ,SqlSerConnect} from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { Connection }  from 'tedious'



(async()=> {
  main();
})();


async function main() {



  //Conexion a base de datos SQL Server
  // try {
  //   const pool = await getConnect();
  //   const result = pool?.request().query('SELECT * from Usuario')
  //   console.log(result)
  // } catch (error) {
    
  // }

  //Conexion a base de datos SQL Server
  await SqlSerConnect.connect({
    host: envs.SQL_SER_HOST,
    user: envs.SQL_SER_USER,
    password: envs.SQL_SER_PASSWORD,
    database: envs.SQL_SER_DATABASE,
  })
  
  //Conexion a base de datos MySql 
  // prueba: SELECT 1+1 AS result
  // await MySqlConnect.connect({
  //   host: envs.MSQL_HOST,
  //   user: envs.MSQL_USER,
  //   password: envs.MSQL_PASSWORD,
  //   database: envs.MSQL_DATABASE,
  // })


  // Conexion a base de datos MongoDB
  // await MongoDatabase.connect( {
  //   dbName: envs.MONGO_DB_NAME,
  //   mongoUrl: envs.MONGO_URL,
  // } )

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
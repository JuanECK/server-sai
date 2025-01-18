import { envs } from './config/envs';
import { MongoDatabase, MySqlConnect } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  //Conexion a base de datos MySql
  await MySqlConnect.connect({
    host: envs.MSQL_HOST,
    user: envs.MSQL_USER,
    password: envs.MSQL_PASSWORD,
    database: envs.MSQL_DATABASE,
  })

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
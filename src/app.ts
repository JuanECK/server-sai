// -------------------------------------------------------
// -------------------------------------------------------
// Nombre: app.ts
// Autor: Juan Guadalupe Gonzalez Soto
// Fecha: 21/Febrero/2025
// Descripcion: Archivo principal de la aplicacion
// Modiciaciones: 
// -------------------------------------------------------
// -------------------------------------------------------


//---- Dependencias de la app.ts
import { envs } from './config/envs';
import { SqlSerConnect } from './data/mysql/conexion';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  //----Conexion a base de datos SQL Server
  await SqlSerConnect.connect({
    host: envs.SQL_SER_HOST,
    user: envs.SQL_SER_USER,
    password: envs.SQL_SER_PASSWORD,
    database: envs.SQL_SER_DATABASE,
  })
  

  //----Conexion a base de datos MySql 
  // await MySqlConnect.connect({
  //   host: envs.MSQL_HOST,
  //   user: envs.MSQL_USER,
  //   password: envs.MSQL_PASSWORD,
  //   database: envs.MSQL_DATABASE,
  // })

  // ---- Conexion a base de datos 
  const server = new Server({
    port: envs.PORT, // Puerto de la aplicacion
    routes: AppRoutes.routes, // Rutas de la aplicacion
  });

  server.start(); // Iniciar el servidor
}
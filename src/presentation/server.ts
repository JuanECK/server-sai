// -------------------------------------------------------
// -------------------------------------------------------
// Nombre: server.ts
// Autor: Juan Guadalupe Gonzalez Soto
// Fecha: 21/Febrero/2025
// Descripcion: Archivo de configuracion del servidor
// Modiciaciones: 
// -------------------------------------------------------
// -------------------------------------------------------

//---- Dependencias de la server.ts
import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session'
import cors from 'cors';
import fileUpload from 'express-fileupload'

//---- Interfaz del servidor
interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

//---- clase del servidor
export class Server {

  //---- Propiedades de la clase
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {

    //---- Configuracion del uso de cors
    const corsOptions = {
      origin: ['http://localhost:4200'], // origen de la aplicacion
      credentials:true,  // credenciales en la cabecera
      optionsSuccessStatus: 200 // status de la respuesta
    }

  //---- Configuracion de cors
  this.app.use(cors(corsOptions)); // para que se pueda acceder a la api desde el origen pactado con sus credenciales y opciones

  //---- Configuracion de las cookies
  this.app.use(cookieParser()) // usar cookies

  //---- Configuracion de los tipos de datos que acepta el servidor 
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    //* Routes
    this.app.use( this.routes ); // usar las ruras de la aplicacion
    this.app.disable('x-powered-by') // desactivar el mensaje de express en la cabecera
    

    // this.app.get('/', (req, res) => {
    // });
    
    //---- Iniciar el servidor con las rutas y configuraciones
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${ this.port }`);// mensaje de servidor corriendo
    });

  }

  //---- Funcion para cerrar el servidor
  public close() {
    this.serverListener?.close();
  }

}

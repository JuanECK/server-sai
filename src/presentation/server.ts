import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session'
import cors from 'cors';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  // public app = express();
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {

    
    const corsOptions = {
      origin: 'http://localhost:4200',
      credentials:true,  
      optionsSuccessStatus: 200 // For legacy browser support
  }

  this.app.use(cors(corsOptions));
  this.app.use(cookieParser())

  // this.app.use(
  //   cors({
  //       origin: "http://localhost:3000",
  //       credentials: true
  //   })
  // );
 
  // this.app.use(cookieSession({
  //   name: 'session',
  //   keys: ['key1', 'key2']
  // }))

    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    // this.app.use(cookieParser())

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    //* Routes
    this.app.use( this.routes );
    this.app.disable('x-powered-by')
    

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    // this.app.get('*', (req, res, next) => {
    this.app.get('/', (req, res) => {
      // res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
      // req.session!.views = (req.session!.views || 0) + 1

      // // Write response
      // res.end(req.session!.views + ' views')

      // res.cookie("x-auth-token", 'juaaaaan', {
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 900000),
      //   sameSite: "strict",
      //   secure: true,
      //   // priority:"high"
      // });
      // res.send('Hola CORS de mierda')
    });
    

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}

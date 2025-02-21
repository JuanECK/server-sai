

import { Router } from 'express';
import { AutenticacionRutas } from './auth/rutas';
import { InicioRutas } from './inicio/rutas.inicio';
// import cors from 'cors';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/auth', AutenticacionRutas.routes );
    router.use('/inicio', InicioRutas.routes);



    return router;
  }


}


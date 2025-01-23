

import { Router } from 'express';
import { AutenticacionRutas } from './auth/rutas';
import cors from 'cors';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/', AutenticacionRutas.routes );



    return router;
  }


}


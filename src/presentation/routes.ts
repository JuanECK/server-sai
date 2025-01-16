import { Router } from 'express';
import { AutenticacionControlador } from './auth/controlador';
import { AutenticacionRutas } from './auth/rutas';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AutenticacionRutas.routes );



    return router;
  }


}


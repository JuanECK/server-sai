// -------------------------------------------------------
// -------------------------------------------------------
// Nombre: routes.ts
// Autor: Juan Guadalupe Gonzalez Soto
// Fecha: 21/Febrero/2025
// Descripcion: Archivo de rutas de la aplicacion
// Modiciaciones: 
// -------------------------------------------------------
// -------------------------------------------------------

//---- Dependencias de la routes.ts
import { Router } from 'express';
import { AutenticacionRutas } from './auth/rutas';
import { InicioRutas } from './inicio/rutas.inicio';
import { ClientesRutas } from './clientes/rutas.clientes';
import { InversionistasRutas } from './inversionistas/rutas.inversionistas';
import { FileUloadRoutes } from './file-upload/rutas.fileUpload';
import { FileDownloadRoutes } from './file-download/rutas.file.download';
import { GeneralesRutas } from './rutasGenerales/rutas.general';

//---- Clase de las rutas
export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    //---- Definicion de las rutas
    router.use('/auth', AutenticacionRutas.routes );
    router.use('/inicio', InicioRutas.routes);
    router.use('/clientes/comisionistas', ClientesRutas.routes);
    router.use('/generales', GeneralesRutas.routes);
    router.use('/clientes/inversionistas', InversionistasRutas.routes);
    router.use('/upload', FileUloadRoutes.routes)
    router.use('/download', FileDownloadRoutes.routes)

    
    return router;
  }

}


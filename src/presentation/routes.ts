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
import { ComisionistasRutas } from './comisionistas/rutas.comisionistas';
import { InversionistasRutas } from './inversionistas/rutas.inversionistas';
import { FileUloadRoutes } from './file-upload/rutas.fileUpload';
import { FileDownloadRoutes } from './file-download/rutas.file.download';
import { GeneralesRutas } from './rutasGenerales/rutas.general';
import { ProveedoresRutas } from './proveedores/rutas.proveedores';
import { PublicoRutas } from './publico/rutas.publico';
import { CuentasRutas } from './cuentas/rutas.cuentas';
import { ObservacionesRutas } from './observaciones/rutas.observaciones';
import { MovInvercionsRutas } from './movInvercion/rutas.movInvercion';
import { MovProveedorRutas } from './movProveedor/rutas.movProveedor';

//---- Clase de las rutas
export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    //---- Definicion de las rutas
    router.use('/auth', AutenticacionRutas.routes );
    router.use('/inicio', InicioRutas.routes);

    router.use('/generales', GeneralesRutas.routes);

    router.use('/movimientos/inversion', MovInvercionsRutas.routes);
    router.use('/movimientos/proveedor', MovProveedorRutas.routes);

    router.use('/clientes/Publico', PublicoRutas.routes);
    router.use('/clientes/comisionistas', ComisionistasRutas.routes);
    router.use('/clientes/inversionistas', InversionistasRutas.routes);
    router.use('/clientes/proveedores', ProveedoresRutas.routes);

    router.use('/cuentas', CuentasRutas.routes);
    
    router.use('/observaciones', ObservacionesRutas.routes);

    router.use('/upload', FileUloadRoutes.routes)
    router.use('/download', FileDownloadRoutes.routes)

    
    return router;
  }

}


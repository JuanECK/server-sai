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
import { MovOficinaRutas } from './movOficina/rutas.movOficina';
import { MovInmobiliarioRutas } from './movInmobiliario/rutas.movInmobiliario';
import { MovFacturaRutas } from './movFacturas/rutas.movIFacturas';
import { MovPresupuestoRutas } from './movPresupuesto/rutas.movPresupuesto';
import { PrestamosRutas } from './movPrestamos/rutas.observaciones';
import { MovComisionesRutas } from './movComisiones/rutas.movComisiones';
import { MovDivisasRutas } from './movDivisas/rutas.Divisas';
import { FinanciamientoRutas } from './Financiemiento/rutas.Financiamiento';
import { MovEliminadosRutas } from './movEliminados/rutas.movIFacturas';
import { ReportesRutas } from './Reportes/rutas.Reportes';
import { MovRetiroCapitalRutas } from './retiroCapital/rutas.movRetiroCapital';

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
    router.use('/movimientos/Oficina', MovOficinaRutas.routes);
    router.use('/movimientos/Inmobiliario', MovInmobiliarioRutas.routes);
    router.use('/movimientos/Factura', MovFacturaRutas.routes);
    router.use('/movimientos/Presupuesto', MovPresupuestoRutas.routes);
    router.use('/movimientos/Prestamos', PrestamosRutas.routes);
    router.use('/movimientos/Comisiones', MovComisionesRutas.routes);
    router.use('/movimientos/Divisas', MovDivisasRutas.routes);
    router.use('/movimientos/Eliminados', MovEliminadosRutas.routes);
    router.use('/movimientos/retiroCapital', MovRetiroCapitalRutas.routes);

    router.use('/clientes/Publico', PublicoRutas.routes);
    router.use('/clientes/comisionistas', ComisionistasRutas.routes);
    router.use('/clientes/inversionistas', InversionistasRutas.routes);
    router.use('/clientes/proveedores', ProveedoresRutas.routes);

    router.use('/cuentas', CuentasRutas.routes);
    
    router.use('/Financiamiento', FinanciamientoRutas.routes);

    router.use('/Reportes', ReportesRutas.routes);

    router.use('/observaciones', ObservacionesRutas.routes);

    router.use('/upload', FileUloadRoutes.routes)
    router.use('/download', FileDownloadRoutes.routes)

    
    return router;
  }

}


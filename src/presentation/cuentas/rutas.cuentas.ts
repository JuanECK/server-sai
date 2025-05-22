import { Router } from "express";
import { CuentasControlador } from "./controlador.cuentas";
import { CuentasServicio } from "../services/cuentas.service";


export class CuentasRutas {

    static get routes():Router{
        const router = Router();
        const cuentasServicio = new CuentasServicio();
        const controlador = new CuentasControlador( cuentasServicio );

        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaModeloNegocio', controlador.getModeloNegocio)
        router.get('/cargaDivisa', controlador.getDivisa)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarCuenta)
        router.post('/cargaCuenta', controlador.cargaCuentaId)
        router.post('/actualizaCuenta', controlador.setActualizaCuenta)
        router.post('/agregaCuenta/', controlador.agregaCuenta)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
import { Router } from "express";
import { ReportesServicio } from "../services/reportes.service";
import { ReportesControlador } from "./controlador.Reportes";

export class ReportesRutas {

    static get routes():Router{
        const router = Router();
        const reportesServicio = new ReportesServicio();
        const controlador = new ReportesControlador( reportesServicio );

        // router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicioI', controlador.getCargaDataInicioIndividual)
        router.get('/cargaDataInicioG', controlador.getCargaDataInicioGlobal)
        router.post('/cargaNombreInv', controlador.getNombreInv)
        // router.post('/busqueda', controlador.getBusqueda)
        // router.post('/prestamo', controlador.prestamo)
        // router.post('/eliminarRegistro', controlador.setEliminarPrestamos)
        // router.post('/asigna', controlador.setAsignaMovimientoCliente)
        // router.post('/cargaMovPrestamos', controlador.cargaPrestamosId)
        // router.post('/actualizaMovPrestamos', controlador.setActualizaPrestamos)
        // router.post('/agregaMovPrestamos/', controlador.agregaPrestamos)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
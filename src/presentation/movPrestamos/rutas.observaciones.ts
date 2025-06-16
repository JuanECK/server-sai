import { Router } from "express";
import { PrestamosControlador } from "./controlador.observaciones";
import { PrestamosServicio } from "../services/movPrestamos.service";



export class PrestamosRutas {

    static get routes():Router{
        const router = Router();
        const prestamosServicio = new PrestamosServicio();
        const controlador = new PrestamosControlador( prestamosServicio );

        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getCargaDataInicio)
        router.get('/cargaHistoricoPrestamos', controlador.getHistorico)
        // router.post('/busqueda', controlador.getBusqueda)
        router.post('/prestamo', controlador.prestamo)
        router.post('/eliminarRegistro', controlador.setEliminarPrestamos)
        router.post('/asigna', controlador.setAsignaMovimientoCliente)
        router.post('/cargaMovPrestamos', controlador.cargaPrestamosId)
        router.post('/actualizaMovPrestamos', controlador.setActualizaPrestamos)
        router.post('/agregaMovPrestamos/', controlador.agregaPrestamos)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
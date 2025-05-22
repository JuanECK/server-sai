import { Router } from "express";
import { ObservacionesControlador } from "./controlador.observaciones";
import { ObservacionesServicio } from "../services/observaciones.service";


export class ObservacionesRutas {

    static get routes():Router{
        const router = Router();
        const observacionesServicio = new ObservacionesServicio();
        const controlador = new ObservacionesControlador( observacionesServicio );

        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaCuentasLista', controlador.getCuentasListas)
        router.get('/cargaHistoricoObservaciones', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarObservaciones)
        router.post('/asigna', controlador.setAsignaMovimientoCliente)
        router.post('/cargaObservaciones', controlador.cargaObservacionesId)
        router.post('/actualizaObservacion', controlador.setActualizaObservaciones)
        router.post('/agregaObservacion/', controlador.agregaObservaciones)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
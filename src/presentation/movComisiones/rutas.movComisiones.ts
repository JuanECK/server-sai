import { Router } from "express";
import { MovComisionesControlador } from "./controlador.movComisiones";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { MovComisionesServicio } from "../services/movComisiones.service";


export class MovComisionesRutas {

    static get routes():Router{
        const router = Router();
        const movComisionesServicio = new MovComisionesServicio();
        const controlador = new MovComisionesControlador( movComisionesServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoComisiones', controlador.getHistorico)
        router.post('/cargaComisionista', controlador.getComisionistaComision)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovComisiones', controlador.cargaMovComisionesId)
        router.post('/actualizaMovComisiones', controlador.setActualizaMovComisiones)
        router.post('/agregaMovComisiones', controlador.agregaMovComisiones)
        
        return router;
    }
    
}
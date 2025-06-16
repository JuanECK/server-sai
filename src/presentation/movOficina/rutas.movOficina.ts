import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { MovOficinaControlador } from "./controlador.movOficina";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { MovOficinaServicio } from "../services/movOficina.service";

export class MovOficinaRutas {

    static get routes():Router{
        const router = Router();
        const movOficinaServicio = new MovOficinaServicio();
        const controlador = new MovOficinaControlador( movOficinaServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoOficina', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovOficina', controlador.cargaMovOficinaId)
        router.post('/actualizaMovOficina/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['movOficina'] ), controlador.setActualizaMovOficina)
        router.post('/agregaMovOficina/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['movOficina'] ),   controlador.agregaMovOficina)
        
        return router;
    }
    
}
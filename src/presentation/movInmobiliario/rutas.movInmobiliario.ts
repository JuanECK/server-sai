import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { MovInmobiliarioControlador } from "./controlador.movInmobiliario";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { MovInmobiliarioServicio } from "../services/movInmobiliario.service";

export class MovInmobiliarioRutas {

    static get routes():Router{
        const router = Router();
        const movInmobiliarioServicio = new MovInmobiliarioServicio();
        const controlador = new MovInmobiliarioControlador( movInmobiliarioServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoInmobiliario', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovInmobiliario', controlador.cargaMovInmobiliarioId)
        router.post('/actualizaMovInmobiliario/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['movInmobiliario'] ), controlador.setActualizaMovInmobiliario)
        router.post('/agregaMovInmobiliario/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['movInmobiliario'] ),   controlador.agregaMovInmobiliario)
        
        return router;
    }
    
}
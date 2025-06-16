import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { FinanciamientoControlador } from "./controlador.Financiamiento";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { FinanciamientoServicio } from "../services/Financiamiento.service";


export class FinanciamientoRutas {

    static get routes():Router{
        const router = Router();
        const financiamientoServicio = new FinanciamientoServicio();
        const controlador = new FinanciamientoControlador( financiamientoServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoFinanciamiento', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/prestamo', controlador.prestamo)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaFinanciamiento', controlador.cargaFinanciamientoId)
        router.post('/actualizaFinanciamiento/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['Financiamiento'] ), controlador.setActualizaFinanciamiento)
        router.post('/agregaFinanciamiento/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['Financiamiento'] ),   controlador.agregaFinanciamiento)
        
        return router;
    }
    
}
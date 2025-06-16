import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { MovFacturaControlador } from "./controlador.movFacturas";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { MovFacturaServicio } from "../services/movFactura.service";

export class MovFacturaRutas {

    static get routes():Router{
        const router = Router();
        const movFacturaServicio = new MovFacturaServicio();
        const controlador = new MovFacturaControlador( movFacturaServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoFactura', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovFactura', controlador.cargaMovFacturaId)
        router.post('/cargaEstatusPagado', controlador.cargaEstatusPagadoId)
        router.post('/actualizaMovFactura', controlador.setActualizaMovFactura)
        router.post('/agregaMovFactura', controlador.agregaMovFactura)
        router.post('/cambiaEstatusPagado', controlador.cambiaEstatusPagado)
        
        return router;
    }
    
}
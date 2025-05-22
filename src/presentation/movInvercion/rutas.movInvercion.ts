import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { MovInvercionsControlador } from "./controlador.movInvercion";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";


export class MovInvercionsRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new MovInvercionsServicio();
        const controlador = new MovInvercionsControlador( clientesServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaEgresoIngreso', controlador.getEgresoIngreso)
        router.get('/cargaCuentaBancaria', controlador.getCuentaBancaria)
        router.get('/cargaHistoricoMovInvercion', controlador.getHistorico)
        router.post('/cargaNombreInv', controlador.getNombreInv)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovInvercion', controlador.cargaMovInvercionId)
        router.post('/actualizaMovInvercion/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['movInvercion'] ), controlador.setActualizaMovInvercion)
        router.post('/actualizaMovInvercionSimple', controlador.setActualizaMovInvercionSimple)
        router.post('/agregaMovInvercion/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['movInvercion'] ),   controlador.agregaMovInvercion)
        router.post('/agregaMovInvercionSimple', controlador.agregaMovInvercionSimple)
        
        return router;
    }
    
}
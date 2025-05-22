import { Router } from "express";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { MovProveedorControlador } from "./controlador.movProveedor";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { MovProveedorServicio } from "../services/movProveedor.service";


export class MovProveedorRutas {

    static get routes():Router{
        const router = Router();
        const movProveedorServicio = new MovProveedorServicio();
        const controlador = new MovProveedorControlador( movProveedorServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoProveedor', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovProveedor', controlador.cargaMovProveedorId)
        router.post('/actualizaMovProveedor/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['movProveedor'] ), controlador.setActualizaMovProveedor)
        router.post('/agregaMovProveedor/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['movProveedor'] ),   controlador.agregaMovProveedor)
        
        return router;
    }
    
}
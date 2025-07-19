import { Router } from "express";
import { MovDivisasServicio } from "../services/movDivisas.service";
import { MovDivisasControlador } from "./controlador.Divisas";


export class MovDivisasRutas {

    static get routes():Router{
        const router = Router();
        const movDivisasServicio = new MovDivisasServicio();
        const controlador = new MovDivisasControlador( movDivisasServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoDivisas', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/cargaSaldoYued', controlador.getSaldoYued)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovDivisas', controlador.cargaMovDivisasId)
        router.post('/actualizaMovDivisas', controlador.setActualizaMovDivisas)
        router.post('/agregaMovDivisas', controlador.agregaMovDivisas)
        
        router.post('/cargaConcepto', controlador.getCargaConcepto)

        return router;
    }
    
}
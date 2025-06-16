import { Router } from "express";
import { MovEliminadosServicio } from "../services/movEliminados.service";
import { MovEliminadosControlador } from "./controlador.movFacturas";

export class MovEliminadosRutas {

    static get routes():Router{
        const router = Router();
        const movEliminadosServicio = new MovEliminadosServicio();
        const controlador = new MovEliminadosControlador( movEliminadosServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        // router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoEliminados', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/restauraRegistro', controlador.setRestauraRegistro)
        // router.post('/cargaMovEliminados', controlador.cargaMovEliminadosId)
        // router.post('/cargaEstatusPagado', controlador.cargaEstatusPagadoId)
        // router.post('/actualizaMovEliminados', controlador.setActualizaMovEliminados)
        // router.post('/agregaMovEliminados', controlador.agregaMovEliminados)
        // router.post('/cambiaEstatusPagado', controlador.cambiaEstatusPagado)
        
        return router;
    }
    
}
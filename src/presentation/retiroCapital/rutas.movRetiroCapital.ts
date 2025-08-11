import { Router } from "express";
import { RetiroCapitalServicio } from "../services/movRetiroCapital.service";
import { MovRetiroCapitalControlador } from "./controlador.movmovRetiroCapital";


export class MovRetiroCapitalRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new RetiroCapitalServicio();
        const controlador = new MovRetiroCapitalControlador( clientesServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getCargaDataInicio)
        router.get('/cargaHistorico', controlador.getHistorico)
        router.post('/busqueda', controlador.getBusqueda)
        // router.post('/prestamo', controlador.prestamo)
        router.post('/eliminarRegistro', controlador.setEliminar)
        // router.post('/asigna', controlador.setAsignaMovimientoCliente)
        router.post('/cargaMovRetiroCapital', controlador.cargaPrestamosId)
        router.post('/actualizaMovRetiroCapital', controlador.setActualizaPrestamos)
        router.post('/agregaMovRetiroCapital', controlador.agregaRetiroCapital)
        
        return router;
    }
    
}
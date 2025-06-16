import { Router } from "express";
import { MovPresupuestoControlador } from "./controlador.movPresupuesto";
import { MovPresupuestoServicio } from "../services/movPresupuesto.service";

export class MovPresupuestoRutas {

    static get routes():Router{
        const router = Router();
        const movPresupuestoServicio = new MovPresupuestoServicio();
        const controlador = new MovPresupuestoControlador( movPresupuestoServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.get('/cargaDataInicio', controlador.getDataInicio)
        router.get('/cargaHistoricoPresupuesto', controlador.getHistorico)
        router.get('/cargaPresupuestoMensual', controlador.getPresupuestoMensual)
        router.post('/InsertaPresupuestoMensual', controlador.setInsertaPresupuestoMensual)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaMovPresupuesto', controlador.cargaMovPresupuestoId)
        router.post('/agregaAbonoPresupuesto', controlador.agregaAbonoPresupuestoMensual)
        router.post('/actualizaAbonoPresupuesto', controlador.setActualizaAbonoMensual)
        router.post('/modificacionPresupuestoMensual', controlador.setModificacionPresupuestoMensual)
        // router.post('/cargaEstatusPagado', controlador.cargaEstatusPagadoId)
        // router.post('/cambiaEstatusPagado', controlador.cambiaEstatusPagado)
        
        return router;
    }
    
} 
import { Router } from "express";
import { PublicoControlador } from "./controlador.publico";
import { PublicoServicio } from "../services/publico.service";


export class PublicoRutas {

    static get routes():Router{
        const router = Router();
        const proveedoresServicio = new PublicoServicio();
        const controlador = new PublicoControlador( proveedoresServicio );

        router.get('/busquedaAll', controlador.BusquedaAll)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarPublico)
        router.post('/cargaPublico', controlador.cargaPublicoId)
        router.post('/actualizaPublico', controlador.setActualizaPublico)
        router.post('/agregaPublico/', controlador.agregaPublico)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
import { Router } from "express";
import { ProveedoresControlador } from "./controlador.proveedores";
import { ProveedoresServicio } from "../services/proveedores.service";


export class ProveedoresRutas {

    static get routes():Router{
        const router = Router();
        const proveedoresServicio = new ProveedoresServicio();
        const controlador = new ProveedoresControlador( proveedoresServicio );

        router.get('/busquedaAll', controlador.BusquedaAll)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/eliminarRegistro', controlador.setEliminarProveedor)
        router.post('/cargaProveedor', controlador.cargaProveedorId)
        router.post('/actualizaProveedor', controlador.setActualizaProveedor)
        router.post('/agregaProveedor/', controlador.agregaProveedor)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
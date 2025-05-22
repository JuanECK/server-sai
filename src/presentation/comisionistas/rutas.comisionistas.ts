import { Router } from "express";
import { ComisionistasServicio } from "../services/comisionistas.service";
import { ComisionistasControlador } from "./controlador.comisionistas";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";


export class ComisionistasRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new ComisionistasServicio();
        const controlador = new ComisionistasControlador( clientesServicio );
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.post('/busqueda', controlador.getBusqueda)
        router.post('/registraInversionista', controlador.registraInversionista)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaComisionista', controlador.cargaComisionistaId)
        router.post('/actualizaComisionista/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['comisionistas'] ), controlador.setActualizaComisionista)
        router.post('/agregaComisionista/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['comisionistas'] ),   controlador.agregaComisionista)
        
        return router;
    }
    


}
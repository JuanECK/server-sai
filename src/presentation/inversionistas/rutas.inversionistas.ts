import { Router } from "express";
import { InversionistasControlador } from "./controlador.inversionistas";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";
import { InversionistasServicio } from "../services/inversionistas.service";


export class InversionistasRutas {

    static get routes():Router{
        const router = Router();
        const inversionistasServicio = new InversionistasServicio();
        const controlador = new InversionistasControlador( inversionistasServicio );

        // router.use( FileUploadMiddelware.containFiles);
        // router.use( TypeMiddleware.validTypes( ['comisionistas'] ));
        

        // router.get('/estado', controlador.getEstado)
        // router.get('/ReferidoBRK', controlador.getReferidoBRK)
        // router.get('/ReferidoComisionista', controlador.getReferidoComisionista)
        // router.post('/municipio', controlador.getMunicipio)
        
        router.get('/busquedaAll', controlador.BusquedaAll)
        router.post('/busqueda', controlador.getBusqueda)
        // router.post('/registraInversionista', controlador.registraInversionista)
        router.post('/eliminarRegistro', controlador.setEliminarRegistro)
        router.post('/cargaInversionista', controlador.cargaInversionistaId)
        router.post('/actualizaInversionista/:type', FileActualizedMiddelware.containFiles, TypeMiddleware.validTypes( ['inversionista'] ), controlador.setActualizaInversionista)
        router.post('/agregaInversionista/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['inversionista'] ), controlador.agregaInversionista)
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
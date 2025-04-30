import { Router } from "express";
import { ClientesServicio } from "../services/clientes.service";
import { ClientesControlador } from "./controlador.clientes";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileActualizedMiddelware } from "../middlewares/file.Actualizad.middleware";


export class ClientesRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new ClientesServicio();
        const controlador = new ClientesControlador( clientesServicio );

        // router.use( FileUploadMiddelware.containFiles);
        // router.use( TypeMiddleware.validTypes( ['comisionistas'] ));
        

        // router.get('/estado', controlador.getEstado)
        // router.get('/ReferidoBRK', controlador.getReferidoBRK)
        // router.get('/ReferidoComisionista', controlador.getReferidoComisionista)
        // router.post('/municipio', controlador.getMunicipio)
        
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
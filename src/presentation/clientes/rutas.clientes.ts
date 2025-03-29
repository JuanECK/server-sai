import { Router } from "express";
import { ClientesServicio } from "../services/clientes.service";
import { ClientesControlador } from "./controlador.clientes";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";


export class ClientesRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new ClientesServicio();
        const controlador = new ClientesControlador( clientesServicio );

        // router.use( FileUploadMiddelware.containFiles);
        // router.use( TypeMiddleware.validTypes( ['comisionistas'] ));
        
        router.get('/estado', controlador.getEstado)
        router.post('/municipio', controlador.getMunicipio)
        router.post('/agregaComisionista/:type', FileUploadMiddelware.containFiles, TypeMiddleware.validTypes( ['comisionistas'] ),   controlador.agregaComisionista)
        
        return router;
    }
    
}
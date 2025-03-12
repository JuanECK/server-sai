import { Router } from "express";
import { ClientesServicio } from "../services/clientes.service";
import { ClientesControlador } from "./controlador.clientes";


export class ClientesRutas {

    static get routes():Router{
        const router = Router();
        const clientesServicio = new ClientesServicio();
        const controlador = new ClientesControlador( clientesServicio );
        
        router.get('/estado', controlador.getEstado)
        router.post('/municipio', controlador.getMunicipio)
        
        return router;
    }
    
}
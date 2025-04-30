import { Router } from "express";
import { GeneralesControlador } from "./controlador.general";
import { GeneralesServicio } from "../services/generales.service";


export class GeneralesRutas {

    static get routes():Router{
        const router = Router();
        const generalesServicio = new GeneralesServicio();
        const controlador = new GeneralesControlador( generalesServicio );

        router.get('/estado', controlador.getEstado)
        router.get('/ReferidoBRK', controlador.getReferidoBRK)
        router.get('/ReferidoComisionista', controlador.getReferidoComisionista)
        router.post('/municipio', controlador.getMunicipio)
        
        
        return router;
    }
    
// continuar - actualizar los archivos y actualizar los PDF si es necesario (evaluar si existen archivos a actualizar)


}
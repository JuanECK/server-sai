import { Router } from "express";
import { AutenticacionControlador } from "./controlador";


export class AutenticacionRutas {

    static get routes():Router {

        const router = Router();
        const controlador = new AutenticacionControlador();

        router.post('/login', controlador.accesoUsuario);
        router.post('/registro',controlador.registroUsuario);

        
        return router
    }
}
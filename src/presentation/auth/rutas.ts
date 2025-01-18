import { Router } from "express";
import { AutenticacionControlador } from "./controlador";
import { AutenticacionServicio } from "../services/autenticacion.service";


export class AutenticacionRutas {

    static get routes():Router {

        const router = Router();

        const autenticacionServicio = new AutenticacionServicio()
        const controlador = new AutenticacionControlador( autenticacionServicio );

        router.post('/login', controlador.accesoUsuario);
        router.post('/registro',controlador.registroUsuario);

        
        return router
    }
}
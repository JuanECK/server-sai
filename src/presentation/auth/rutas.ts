import { Router } from "express";
import { AutenticacionControlador } from "./controlador";
import { AutenticacionServicio } from "../services/autenticacion.service";
import cookieParser from "cookie-parser";


export class AutenticacionRutas {

    static get routes():Router {

        const router = Router();
        // router.use(cookieParser())

        const autenticacionServicio = new AutenticacionServicio()
        const controlador = new AutenticacionControlador( autenticacionServicio );

        // router.post('/login', (req, res)=>{
        //     res.cookie('cookie', 'usuario.token',{path:'/', })
        // });

        router.post('/login', controlador.accesoUsuario);
        router.post('/registro',controlador.registroUsuario);
        router.get('/usuario',controlador.getUsuarios);

        
        return router
    }
}
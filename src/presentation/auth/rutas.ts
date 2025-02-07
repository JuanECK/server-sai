import { Router } from "express";
import { AutenticacionControlador } from "./controlador";
import { AutenticacionServicio } from "../services/autenticacion.service";
import cookieParser from "cookie-parser";
import {db}  from "../../data/mysql/db/coneccion";
import { cryptoAdapter } from "../../config";


export class AutenticacionRutas {

    static get routes():Router {

        const router = Router();
        router.use(cookieParser())

        // const cookies = {
        //     expires: new Date(Date.now().valueOf()),
        //     httpOnly: true
        //   }

        const autenticacionServicio = new AutenticacionServicio()
        const controlador = new AutenticacionControlador( autenticacionServicio );

        // router.post('/login', (req, res)=>{
        //     res.cookie('cookie', 'usuario.token',{path:'/', })
        // });

        router.post('/login', controlador.iniciarSession);

        router.post('/cookie', controlador.coockie);

        // router.post('/session', controlador.iniciarSession);

        router.post('/logOut', controlador.terminarSession);

        // router.post('/cookie', function(req, res){
            // const resp = req.headers.cookie
            // const coock = resp?.split("; ").filter(c=>/^x-auth-token.+/.test(c))
            // .map(e=>e.split("="));
            // const cookie = coock?.at(0)
            // console.log(cookie![1])

            // res.cookie("x-auth-token", 'juaaaaan', {
            //       httpOnly: true,
            //     //   expires: new Date(Date.now() + 900000),
            //       sameSite: "strict",
            //       secure: true,
            //     //   priority:"high"
            //     });
            // return res
            // .status(200)
            // .json({user: 'Juan', loged: true})  

        // });

        // router.post('/validaSession', controlador.sessionUsuario);
        
        // -------------------------------------------------------------------
        // ----------------------------  DEV-OPTIONS  ------------------------
        // -------------------------------------------------------------------
        router.post('/registro',controlador.registroUsuario);
        router.get('/usuario',controlador.getUsuarios);
        router.post('/modulo', async (req, res)=>{
            const { id } = req.body

            try {
                
                const data = JSON.parse(cryptoAdapter.muestraSecreto(id))
                console.log(data)
                console.log(data.id_Perfil)
                
                const sql = 'exec  sp_modulos_gral :id';
                const usuario = await db.query( sql, { replacements: { id:data.id_Perfil} } );            
                const resultado = JSON.parse(JSON.stringify(usuario))
    
                res.json(resultado)

            } catch (error) {
                res.json(['error'])
            }

        });
    
        return router
    }
}
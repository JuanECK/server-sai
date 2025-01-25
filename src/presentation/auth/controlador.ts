import { Response, Request } from "express"
import { GeneraError, LoginUsusarioDto } from "../../core"
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import { AutenticacionServicio } from "../services/autenticacion.service";
import   UsuarioModelo   from "../../data/mysql/model/usuario.model";
import { db } from "../../data/mysql/db/coneccion";
// import { CookieAdapter } from "../../config";
// import  CookieParser from 'cookie-parser'


export class AutenticacionControlador {

    constructor(
        public readonly autentucacionServicio: AutenticacionServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) =>{

        if( error instanceof GeneraError ){
            return res.status( error.codigoEstatus).json({ error: error.mensaje })
        }
        
        console.log(`${error}`);
        return res.status(500).json({error: 'Error interno del servidor'})

    }

    registroUsuario = ( req:Request, res:Response ) =>{
        const[ error, registroDto ] = RegistroUsusarioDto.crear( req.body );
        if( error ) return res.status( 400 ).json( { error } );


        this.autentucacionServicio.registroUsuario( registroDto! )
        // .then( ( usuario ) => res.status(200).json({message: 'Usuario creado con exito'}) )
        .then( ( usuario ) => res.json( usuario ) )
        .catch( error => this.manejadorErrores( error, res ) )
        
        // res.json('registro de usuario')
    }
    
    accesoUsuario = ( req:Request, res:Response ) => {
        console.log(req.body)
        
         const[ error, loginUserDto ] = LoginUsusarioDto.crear( req.body );
         if( error ) return res.status( 400 ).json( { error } )
        
            this.autentucacionServicio.accesoUsuario( loginUserDto! )
            // res.cookie('cookie', 'usuario.token')
        // .then( ( usuario ) => res.cookie('cookie', 'usuario.token',{path:'/', }))
        // .then( ( usuario ) => res.cookie( 'session', usuario.token, {httpOnly: true, sameSite: 'strict'}) )
        // //    CookieAdapter.setCookie( res, 'sesion',usuario.token.toString() , { httpOnly: true, sameSite: 'strict' } );
        .then( ( usuario ) => res.status(200).json( usuario ) )
        // .then((result) => {res.cookie('cookie', 'usuario.token',{path:'/', })})
        // .cookie('asses','userToken,{httpOnly: ture}')
        .catch( error => this.manejadorErrores( error, res ))
        //  );

        //  res.cookie('cookie', 'usuario.token')
    }
    getUsuarios = async ( req:Request, res:Response ) => {
        const usuarios = await UsuarioModelo.findAll()
        // const usuarios = await db.query('SELECT * FROM Usuario') ;
        res.json(usuarios)

    }
}
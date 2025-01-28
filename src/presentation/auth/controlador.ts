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
        .then( ( usuario ) => res.json( usuario ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }
    
    accesoUsuario = ( req:Request, res:Response ) => {
        console.log(req.body)
        
        const[ error, loginUserDto ] = LoginUsusarioDto.crear( req.body );
        if( error ) return res.status( 400 ).json( { error } )
        
        this.autentucacionServicio.accesoUsuario( loginUserDto! )
        .then( ( usuario ) => res.status(200).json( usuario ) )
        .catch( error => this.manejadorErrores( error, res ))
    }

    sessionUsuario = ( req:Request, res:Response ) => {
        const { Token } = req.body;

        this.autentucacionServicio.sessionUsuario( Token )
        .then( ( user ) => res.json( user ) )
        .catch( error => this.manejadorErrores( error, res ) ) 
        
        // res.status(200).json({respuesta:true})
        // res.status(400).json('no')
    }

    getUsuarios = async ( req:Request, res:Response ) => {
        // const usuarios = await UsuarioModelo.findAll()
        const usuarios = await db.query('SELECT * FROM Usuario') ;
        const data = usuarios[0]
        res.json(data)

    }
}
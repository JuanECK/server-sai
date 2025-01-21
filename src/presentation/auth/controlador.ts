import { Response, Request } from "express"
import { GeneraError } from "../../core"
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import { AutenticacionServicio } from "../services/autenticacion.service";
import { Usuario } from "../../data/mysql/model/usuario.model";
import { db } from "../../data/mysql/db/coneccion";


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
        console.log(req.body)
        if( error ) return res.status( 400 ).json( { error } );

        this.autentucacionServicio.registroUsuario( registroDto! )
        .then( ( usuario ) => res.json( usuario ) )
        .catch( error => this.manejadorErrores( error, res ) )
        
    }
    
    accesoUsuario = ( req:Request, res:Response ) => {
        res.json('acceso de usuario')

    }
    getUsuarios = ( req:Request, res:Response ) => {
        // const usuarios = Usuario.findAll()
        const usuarios = db.query('SELECT * FROM Usuario') ;
        res.json(usuarios)

    }
}
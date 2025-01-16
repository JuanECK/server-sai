import { Response, Request } from "express"
import { GeneraError } from "../../core"
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";


export class AutenticacionControlador {

    constructor(){}

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

        // this.
        
    }
    
    accesoUsuario = ( req:Request, res:Response ) => {
        res.json('acceso de usuario')

    }
}
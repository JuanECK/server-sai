import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ClientesServicio } from "../services/clientes.service";


export class ClientesControlador {

    constructor(
        public readonly clientesServicio:ClientesServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    getEstado = ( req:Request, res:Response ) => {
        
        this.clientesServicio.getEstado()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }

    getMunicipio = ( req:Request, res:Response ) => {
       
        this.clientesServicio.getMunicipio( req.body.estado )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        

    }

}
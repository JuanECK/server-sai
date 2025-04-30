import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { GeneralesServicio } from "../services/generales.service";


export class GeneralesControlador {

    constructor(
        public readonly generalesServicio:GeneralesServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    getEstado = ( req:Request, res:Response ) => {
        
        this.generalesServicio.getEstado()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }
    getReferidoBRK = ( req:Request, res:Response ) => {
        
        this.generalesServicio.getReferidoBRK()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }
    getReferidoComisionista = ( req:Request, res:Response ) => {
        
        this.generalesServicio.getReferidoComisionista()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }
    getMunicipio = ( req:Request, res:Response ) => {
       
        this.generalesServicio.getMunicipio( req.body.estado )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        
    }

}
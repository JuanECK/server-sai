import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { DashboardServicio } from "../services/dashboard.service";

export class InicioControlador {

    constructor(
        public readonly dashboardServicio:DashboardServicio
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    dashboard = ( req:Request, res:Response ) => {
        
        this.dashboardServicio.dashboard()
        .then( ( servicio ) => res.json( servicio ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setSaldoInicial = ( req:Request, res:Response ) => {
        

        this.dashboardServicio.setSaldoInicial( req.body.saldo, req.body.identificador, req.body.usuario)
        .then( ( servicio ) => res.json( servicio ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregaObservacionesDto } from "../../core/DTOS/observaciones/agrega-observaciones.dto";
import { EditaObservacionesDto } from "../../core/DTOS/observaciones/edita-observaciones.dto";
import { ObservacionesServicio } from "../services/observaciones.service";
import { AsignaObservacionesDto } from "../../core/DTOS/observaciones/asigna-observaciones.dto";


export class ObservacionesControlador {

    constructor(
        public readonly observacionesServicio:ObservacionesServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    getBusqueda = ( req:Request, res:Response ) =>{
        // console.log(req.body.criterio)
        this.observacionesServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')
    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.observacionesServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getCuentasListas = ( req:Request, res:Response ) =>{
        this.observacionesServicio.getCuentasListas()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getHistorico = ( req:Request, res:Response ) =>{
        this.observacionesServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    setEliminarObservaciones = ( req:Request, res:Response ) =>{


        this.observacionesServicio.setEliminarObservaciones( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setAsignaMovimientoCliente = ( req:Request, res:Response ) =>{

        const [ error, asignaObservacionesDto ] = AsignaObservacionesDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.observacionesServicio.setAsignaMovimientoCliente( asignaObservacionesDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    cargaObservacionesId = ( req:Request, res:Response ) =>{

        this.observacionesServicio.cargaObservacionesId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaObservaciones = ( req:Request, res:Response ) =>{
        
        const [ error, editaObservacionesDto ] = EditaObservacionesDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.observacionesServicio.setActualizaObservaciones( editaObservacionesDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaObservaciones = ( req:Request, res:Response ) =>{

        const [ error, agregarObservacionesDto ] = AgregaObservacionesDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.observacionesServicio.agregaObservaciones( agregarObservacionesDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
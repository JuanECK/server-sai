import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovInvercionsServicio } from "../services/movInvercion.service";
import { RetiroCapitalServicio } from "../services/movRetiroCapital.service";
import { AgregarMovRetiroCapitalDto } from "../../core/DTOS/movRetiroCapital/agrega-MovRetiroCapital.dto";
import { ActualizaMovRetiroCapitalDto } from "../../core/DTOS/movRetiroCapital/actualiza-MovRetiroCapital.dto";


export class MovRetiroCapitalControlador {

    constructor(
        public readonly retiroCapitalServicio:RetiroCapitalServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    prestamo = ( req:Request, res:Response ) =>{

        this.retiroCapitalServicio.prestamo( req.body.Id_Fondeo )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


    BusquedaAll = ( req:Request, res:Response ) =>{
        this.retiroCapitalServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getCargaDataInicio = ( req:Request, res:Response ) =>{
        this.retiroCapitalServicio.getCargaDataInicio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getHistorico = ( req:Request, res:Response ) =>{
        this.retiroCapitalServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getBusqueda = ( req:Request, res:Response ) =>{
        // console.log(req.body.criterio)
        this.retiroCapitalServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')
    }

    setEliminar = ( req:Request, res:Response ) =>{


        this.retiroCapitalServicio.setEliminar( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    // setAsignaMovimientoCliente = ( req:Request, res:Response ) =>{

    //     const [ error, asignaPrestamosDto ] = AsignaPrestamosDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.retiroCapitalServicio.setAsignaMovimientoCliente( asignaPrestamosDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    cargaPrestamosId = ( req:Request, res:Response ) =>{

        this.retiroCapitalServicio.cargaPrestamosId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaPrestamos = ( req:Request, res:Response ) =>{
        
        const [ error, actualizaMovRetiroCapitalDto ] = ActualizaMovRetiroCapitalDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.retiroCapitalServicio.setActualizaPrestamos( actualizaMovRetiroCapitalDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaRetiroCapital = ( req:Request, res:Response ) =>{

        const [ error, agregarMovRetiroCapitalDto ] = AgregarMovRetiroCapitalDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.retiroCapitalServicio.agregaPrestamos( agregarMovRetiroCapitalDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
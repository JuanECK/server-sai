import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregaPrestamosDto } from "../../core/DTOS/movPrestamos/agrega-Prestamos.dto";
import { EditaPrestamosDto } from "../../core/DTOS/movPrestamos/edita-Prestamos.dto";
import { PrestamosServicio } from "../services/movPrestamos.service";
import { AsignaPrestamosDto } from "../../core/DTOS/movPrestamos/asigna-Prestamos.dto";


export class PrestamosControlador {

    constructor(
        public readonly prestamosServicio:PrestamosServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    prestamo = ( req:Request, res:Response ) =>{

        this.prestamosServicio.prestamo( req.body.Id_Fondeo )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    // getBusqueda = ( req:Request, res:Response ) =>{
    //     // console.log(req.body.criterio)
    //     this.prestamosServicio.getBusqueda( req.body.criterio )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exito')
    // }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.prestamosServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getCargaDataInicio = ( req:Request, res:Response ) =>{
        this.prestamosServicio.getCargaDataInicio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getHistorico = ( req:Request, res:Response ) =>{
        this.prestamosServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    setEliminarPrestamos = ( req:Request, res:Response ) =>{


        this.prestamosServicio.setEliminarPrestamos( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setAsignaMovimientoCliente = ( req:Request, res:Response ) =>{

        const [ error, asignaPrestamosDto ] = AsignaPrestamosDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.prestamosServicio.setAsignaMovimientoCliente( asignaPrestamosDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    cargaPrestamosId = ( req:Request, res:Response ) =>{

        this.prestamosServicio.cargaPrestamosId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaPrestamos = ( req:Request, res:Response ) =>{
        
        const [ error, editaPrestamosDto ] = EditaPrestamosDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.prestamosServicio.setActualizaPrestamos( editaPrestamosDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaPrestamos = ( req:Request, res:Response ) =>{

        const [ error, agregarPrestamosDto ] = AgregaPrestamosDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.prestamosServicio.agregaPrestamos( agregarPrestamosDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
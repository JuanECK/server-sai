import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ReportesServicio } from "../services/reportes.service";
// import { AgregaReportesDto } from "../../core/DTOS/movReportes/agrega-Reportes.dto";
// import { EditaReportesDto } from "../../core/DTOS/movReportes/edita-Reportes.dto";
// import { ReportesServicio } from "../services/movReportes.service";
// import { AsignaReportesDto } from "../../core/DTOS/movReportes/asigna-Reportes.dto";


export class ReportesControlador {

    constructor(
        public readonly reportesServicio:ReportesServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    // prestamo = ( req:Request, res:Response ) =>{

    //     this.reportesServicio.prestamo( req.body.Id_Fondeo )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // getBusqueda = ( req:Request, res:Response ) =>{
    //     // console.log(req.body.criterio)
    //     this.reportesServicio.getBusqueda( req.body.criterio )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exito')
    // }

    // BusquedaAll = ( req:Request, res:Response ) =>{
    //     this.reportesServicio.BusquedaAll()
    //     .then( ( response ) => res.json( response ) )
    //     .catch( error => this.manejadorErrores( error, res ) )
    // }

    getCargaDataInicioIndividual = ( req:Request, res:Response ) =>{
        console.log('Reportessss')
        this.reportesServicio.getCargaDataInicioIndividual()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getCargaDataInicioGlobal = ( req:Request, res:Response ) =>{
        console.log('Reportessss')
        this.reportesServicio.getCargaDataInicioGlobal()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    getNombreInv = ( req:Request, res:Response ) =>{
        this.reportesServicio.getNombreInv(req.body.criterio)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    // setEliminarReportes = ( req:Request, res:Response ) =>{


    //     this.reportesServicio.setEliminarReportes( req.body )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // setAsignaMovimientoCliente = ( req:Request, res:Response ) =>{

    //     const [ error, asignaReportesDto ] = AsignaReportesDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.reportesServicio.setAsignaMovimientoCliente( asignaReportesDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // cargaReportesId = ( req:Request, res:Response ) =>{

    //     this.reportesServicio.cargaReportesId(req.body.id)
    //     .then( ( response ) => res.json( response ) )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // setActualizaReportes = ( req:Request, res:Response ) =>{
        
    //     const [ error, editaReportesDto ] = EditaReportesDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.reportesServicio.setActualizaReportes( editaReportesDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // agregaReportes = ( req:Request, res:Response ) =>{

    //     const [ error, agregarReportesDto ] = AgregaReportesDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.reportesServicio.agregaReportes( agregarReportesDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

}
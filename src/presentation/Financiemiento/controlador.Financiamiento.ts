import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { FinanciamientoServicio } from "../services/Financiamiento.service";
import { ActualizaFinanciamientoDto } from "../../core/DTOS/Financiamiento/actualiza-Financiamientodto";
import { AgregarFinanciamientoDto } from "../../core/DTOS/Financiamiento/agrega-Financiamiento.dto";



export class FinanciamientoControlador {

    constructor(
        public readonly FinanciamientoServicio:FinanciamientoServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    // getEstado = ( req:Request, res:Response ) => {
        
    //     this.FinanciamientoServicio.getEstado()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }
    // getReferidoMovInvercion = ( req:Request, res:Response ) => {
        
    //     this.FinanciamientoServicio.getReferidoMovInvercion()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getReferidoBRK = ( req:Request, res:Response ) => {
        
    //     this.FinanciamientoServicio.getReferidoBRK()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getMunicipio = ( req:Request, res:Response ) => {
       
    //     this.FinanciamientoServicio.getMunicipio( req.body.estado )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
        
    // }
    BusquedaAll = ( req:Request, res:Response ) =>{
        this.FinanciamientoServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getDataInicio = ( req:Request, res:Response ) =>{
        this.FinanciamientoServicio.getDataInicio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getBusqueda = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.FinanciamientoServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }
    getHistorico = ( req:Request, res:Response ) =>{
        this.FinanciamientoServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaFinanciamientoId = ( req:Request, res:Response ) =>{

        this.FinanciamientoServicio.cargaFinanciamientoId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    prestamo = ( req:Request, res:Response ) =>{

        this.FinanciamientoServicio.prestamo( req.body.Id )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaFinanciamiento = ( req:Request, res:Response ) =>{

        // console.log( ' actualizacion 1 ', req.body)

        // let comFiles = true
        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameIne:req.body.comprobanteINE, NameContrato:req.body.comprobanteContrato, eliminadoIne:req.body.eliminadoINE, eliminadoContrato:req.body.eliminadoContrato} 
        // console.log({comprobantesNames:comprobantesNames})
        // console.log({files:files})
        // if( files[0].name == '0SAF0_SAF0.pdf' && files[1].name == '0SAF0_SAF0.pdf' ){
        //     comFiles = false
        // }

        
        const [ error, actualizaMovInvercionDto ] = ActualizaFinanciamientoDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )



        // this.FinanciamientoServicio.setActualizaMovInvercion( files, comFiles, `uploads/${ type }`, actualizaMovInvercionDto! )
        this.FinanciamientoServicio.setActualizaMovInvercion( files, comprobantesNames, `uploads/${ type }`, actualizaMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{

        this.FinanciamientoServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )
    
    }

    agregaFinanciamiento = ( req:Request, res:Response ) =>{

        let comFiles = true
        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        
        if( files[0].name == '0SAF0_SAF0.pdf' && files[1].name == '0SAF0_SAF0.pdf' ){
            comFiles = false
        }

        const [ error, agregarFinanciamientoDto ] = AgregarFinanciamientoDto.crear( req.body )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.FinanciamientoServicio.AgregaFinanciamiento( files, comFiles, `uploads/${ type }`, agregarFinanciamientoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
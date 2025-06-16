import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovOficinaServicio } from "../services/movOficina.service";
import { AgregarMovOficinaDto } from "../../core/DTOS/MovOficina/agrega-MovOficina.dto";
import { ActualizaMovOficinaDto } from "../../core/DTOS/MovOficina/actualiza-MovOficina.dto";


export class MovOficinaControlador {

    constructor(
        public readonly movOficinaServicio:MovOficinaServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    // getEstado = ( req:Request, res:Response ) => {
        
    //     this.movOficinaServicio.getEstado()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }
    // getReferidoMovInvercion = ( req:Request, res:Response ) => {
        
    //     this.movOficinaServicio.getReferidoMovInvercion()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getReferidoBRK = ( req:Request, res:Response ) => {
        
    //     this.movOficinaServicio.getReferidoBRK()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getMunicipio = ( req:Request, res:Response ) => {
       
    //     this.movOficinaServicio.getMunicipio( req.body.estado )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
        
    // }
    BusquedaAll = ( req:Request, res:Response ) =>{
        this.movOficinaServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getDataInicio = ( req:Request, res:Response ) =>{
        this.movOficinaServicio.getDataInicio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getBusqueda = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.movOficinaServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }
    getHistorico = ( req:Request, res:Response ) =>{
        this.movOficinaServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaMovOficinaId = ( req:Request, res:Response ) =>{

        this.movOficinaServicio.cargaMovOficinaId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovOficina = ( req:Request, res:Response ) =>{

        // console.log( ' actualizacion 1 ', req.body)

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameComprobante:req.body.comprobanteCambio} 
        // console.log(comprobantesNames)

        
        const [ error, actualizaMovInvercionDto ] = ActualizaMovOficinaDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )


        this.movOficinaServicio.setActualizaMovInvercion( files, comprobantesNames, `uploads/${ type }`, actualizaMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movOficinaServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovOficina = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]

        const comFiles = files[0] ? true:false 

        // console.log(comFiles)

        const [ error, agregarMovOficinaDto ] = AgregarMovOficinaDto.crear( req.body )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.movOficinaServicio.AgregaMovOficina( files, comFiles, `uploads/${ type }`, agregarMovOficinaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
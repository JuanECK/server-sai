import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovProveedorServicio } from "../services/movProveedor.service";
import { AgregarMovProveedorDto } from "../../core/DTOS/MovProveedor/agrega-MovProveedor.dto";
import { ActualizaMovProveedorDto } from "../../core/DTOS/MovProveedor/actualiza-MovProveedor.dto";


export class MovProveedorControlador {

    constructor(
        public readonly movProveedorServicio:MovProveedorServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    // getEstado = ( req:Request, res:Response ) => {
        
    //     this.movProveedorServicio.getEstado()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }
    // getReferidoMovInvercion = ( req:Request, res:Response ) => {
        
    //     this.movProveedorServicio.getReferidoMovInvercion()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getReferidoBRK = ( req:Request, res:Response ) => {
        
    //     this.movProveedorServicio.getReferidoBRK()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getMunicipio = ( req:Request, res:Response ) => {
       
    //     this.movProveedorServicio.getMunicipio( req.body.estado )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
        
    // }
    BusquedaAll = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getDataInicio = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getDataInicio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getBusqueda = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.movProveedorServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }
    getHistorico = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaMovProveedorId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovProveedorId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovProveedor = ( req:Request, res:Response ) =>{

        // console.log( ' actualizacion 1 ', req.body)

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameComprobante:req.body.comprobanteCambio} 
        // console.log(comprobantesNames)

        
        const [ error, actualizaMovInvercionDto ] = ActualizaMovProveedorDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )


        this.movProveedorServicio.setActualizaMovInvercion( files, comprobantesNames, `uploads/${ type }`, actualizaMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovProveedor = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]

        const comFiles = files[0] ? true:false 

        // console.log(comFiles)

        const [ error, agregarMovProveedorDto ] = AgregarMovProveedorDto.crear( req.body )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.movProveedorServicio.AgregaMovProveedor( files, comFiles, `uploads/${ type }`, agregarMovProveedorDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
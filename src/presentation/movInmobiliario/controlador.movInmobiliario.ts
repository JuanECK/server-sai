import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovProveedorServicio } from "../services/movProveedor.service";
import { AgregarMovProveedorDto } from "../../core/DTOS/MovProveedor/agrega-MovProveedor.dto";
import { ActualizaMovProveedorDto } from "../../core/DTOS/MovProveedor/actualiza-MovProveedor.dto";
import { MovInmobiliarioServicio } from "../services/movInmobiliario.service";
import { AgregarMovInmobiliarioDto } from "../../core/DTOS/MovInmobiliario/agrega-MovInmobiliario.dto";
import { ActualizaMovInmobiliarioDto } from "../../core/DTOS/MovInmobiliario/actualiza-MovInmobiliario.dto";


export class MovInmobiliarioControlador {

    constructor(
        public readonly movProveedorServicio:MovInmobiliarioServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }
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

    getConcepto = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.getConcepto( req.body.concepto )
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


    cargaMovInmobiliarioId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovInmobiliarioId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovInmobiliario = ( req:Request, res:Response ) =>{

        // console.log( ' actualizacion 1 ', req.body)
        console.log({BODYY:req.body})

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameComprobante:req.body.comprobanteCambio, eliminadoComprobante:req.body.eliminadoComp} 

        // const comprobantesNames = {NameComprobante:req.body.comprobanteCambio} 
        // console.log(comprobantesNames)
        // console.log(files)
        
        const [ error, actualizaMovInmobiliarioDto ] = ActualizaMovInmobiliarioDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )
            
        this.movProveedorServicio.setActualizaMovInmobiliario( files, comprobantesNames, `uploads/${ type }`, actualizaMovInmobiliarioDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

        
    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovInmobiliario = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]

        const comFiles = files[0] ? true:false 

        // console.log(comFiles)

        const [ error, agregarMovInmobiliarioDto ] = AgregarMovInmobiliarioDto.crear( req.body )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.movProveedorServicio.agregaMovInmobiliario( files, comFiles, `uploads/${ type }`, agregarMovInmobiliarioDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovInvercionsServicio } from "../services/movInvercion.service";


export class MovInvercionsControlador {

    constructor(
        public readonly movInvercionsServici:MovInvercionsServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    // getEstado = ( req:Request, res:Response ) => {
        
    //     this.movInvercionsServici.getEstado()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }
    // getReferidoMovInvercion = ( req:Request, res:Response ) => {
        
    //     this.movInvercionsServici.getReferidoMovInvercion()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getReferidoBRK = ( req:Request, res:Response ) => {
        
    //     this.movInvercionsServici.getReferidoBRK()
    //     .then(( estado ) => res.json( estado ))
    //     .catch( error => this.manejadorErrores( error, res ) )
    //     // res.json('exitosa')

    // }

    // getMunicipio = ( req:Request, res:Response ) => {
       
    //     this.movInvercionsServici.getMunicipio( req.body.estado )
    //     .then(( municipio ) => res.json( municipio ))
    //     .catch( error => this.manejadorErrores( error, res ) )
        
    // }
    BusquedaAll = ( req:Request, res:Response ) =>{
        this.movInvercionsServici.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getEgresoIngreso = ( req:Request, res:Response ) =>{
        this.movInvercionsServici.getEgresoIngreso()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }
    getCuentaBancaria = ( req:Request, res:Response ) =>{
        this.movInvercionsServici.getCuentaBancaria()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getNombreInv = ( req:Request, res:Response ) =>{

        console.log(req.body.criterio)
        this.movInvercionsServici.getNombreInv( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )

    }

    getBusqueda = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.movInvercionsServici.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }
    getHistorico = ( req:Request, res:Response ) =>{
        this.movInvercionsServici.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaMovInvercionId = ( req:Request, res:Response ) =>{

        this.movInvercionsServici.cargaMovInvercionId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovInvercion = ( req:Request, res:Response ) =>{

        // console.log( ' actualizacion 1 ', req.body)

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameComprobante:req.body.comprobanteCambio} 
        // console.log(comprobantesNames)

        
        const [ error, actualizaMovInvercionDto ] = ActualizaMovInvercionDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )


        this.movInvercionsServici.setActualizaMovInvercion( files, comprobantesNames, `uploads/${ type }`, actualizaMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovInvercionSimple = ( req:Request, res:Response ) =>{

        console.log(' actualizacion 2 ', req.body)

        // const [ error, actualizaMovInvercionDto ] = ActualizaMovInvercionDto.crear( req.body.formulario )
        // if( error ) return res.status( 400 ).json( { error } )


        // this.movInvercionsServici.setActualizaMovInvercionSimple( actualizaMovInvercionDto! )
        // .then( ( resultado ) => { res.json( resultado ) } )
        // .catch( error => this.manejadorErrores( error, res ) )

    }

    // registraInversionista = ( req:Request, res:Response ) =>{


    //     const [ error, registraInversionistaDto ] = RegistraInversionistaDto.crear ( req.body )
    //     // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.movInvercionsServici.registraInversionista( registraInversionistaDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movInvercionsServici.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovInvercion = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]

        const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.movInvercionsServici.AgregaMovInvercion( files, `uploads/${ type }`, agregarMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }
    agregaMovInvercionSimple = ( req:Request, res:Response ) =>{


        const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body.formulario )
        // const [ error, agregarMovInvercionDto ] = AgregarMovInvercionDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.movInvercionsServici.AgregaMovInvercionSimple( agregarMovInvercionDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
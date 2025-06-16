import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { MovProveedorServicio } from "../services/movProveedor.service";
import { AgregarMovProveedorDto } from "../../core/DTOS/MovProveedor/agrega-MovProveedor.dto";
import { ActualizaMovProveedorDto } from "../../core/DTOS/MovProveedor/actualiza-MovProveedor.dto";
import { MovEliminadosServicio } from "../services/movEliminados.service";
// import { AgregarMovEliminadosDto } from "../../core/DTOS/MovEliminados/agrega-MovEliminados.dto";
// import { ActualizaMovEliminadosDto } from "../../core/DTOS/MovEliminados/actualiza-MovEliminados.dto";
// import { CambiaEstatusPagadoDto } from "../../core/DTOS/MovEliminados/cambia-EstatusPagado.dto";


export class MovEliminadosControlador {

    constructor(
        public readonly movProveedorServicio:MovEliminadosServicio,
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


    cargaMovEliminadosId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovEliminadosId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }
    cargaEstatusPagadoId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaEstatusPagadoId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    // setActualizaMovEliminados = ( req:Request, res:Response ) =>{
        
    //     const [ error, actualizaMovEliminadosDto ] = ActualizaMovEliminadosDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )


    //     this.movProveedorServicio.setActualizaMovEliminados( actualizaMovEliminadosDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    setRestauraRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setRestauraRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    // agregaMovEliminados = ( req:Request, res:Response ) =>{

    //     const [ error, agregarMovEliminadosDto ] = AgregarMovEliminadosDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.movProveedorServicio.agregaMovEliminados( agregarMovEliminadosDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    // cambiaEstatusPagado = ( req:Request, res:Response ) =>{

    //     const [ error, cambiaEstatusPagadoDto ] = CambiaEstatusPagadoDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.movProveedorServicio.cambiaEstatusPagado( cambiaEstatusPagadoDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }


}
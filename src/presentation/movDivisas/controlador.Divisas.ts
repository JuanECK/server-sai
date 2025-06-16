import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { MovDivisasServicio } from "../services/movDivisas.service";
import { ActualizaMovDivisasDto } from "../../core/DTOS/MovDivisas/actualiza-MovDivisas.dto";
import { AgregarMovDivisasDto } from "../../core/DTOS/MovDivisas/agrega-MovDivisas.dto";


export class MovDivisasControlador {

    constructor(
        public readonly movProveedorServicio:MovDivisasServicio,
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
    getSaldoYued = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.movProveedorServicio.getSaldoYued( req.body.id )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }
    getHistorico = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaMovDivisasId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovDivisasId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovDivisas = ( req:Request, res:Response ) =>{

        
        const [ error, actualizaMovDivisasDto ] = ActualizaMovDivisasDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

            // console.log(actualizaMovDivisasDto)


        this.movProveedorServicio.setActualizaMovDivisas( actualizaMovDivisasDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovDivisas = ( req:Request, res:Response ) =>{
        
        const objeto = Object.assign(req.body.formulario[0], req.body.formulario[1])
        // console.log(objeto)

        const [ error, agregarMovDivisasDto ] = AgregarMovDivisasDto.crear( objeto )
        if( error ) return res.status( 400 ).json( { error } )

        this.movProveedorServicio.agregaMovDivisas( agregarMovDivisasDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
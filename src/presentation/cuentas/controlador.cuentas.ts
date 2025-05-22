import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { AgregaCuentaDto } from "../../core/DTOS/cuenta/agrega-cuenta.dto";
import { EditaCuentaDto } from "../../core/DTOS/cuenta/edita-cuenta.dto";
import { CuentasServicio } from "../services/cuentas.service";


export class CuentasControlador {

    constructor(
        public readonly cuentasServicio:CuentasServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) => {

        if( error instanceof GeneraError ) {
            return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
        }

        console.log(` ${error} `);
        return res.status( 500 ).json( {error:'Error interno del servidor'} );


    }

    getBusqueda = ( req:Request, res:Response ) =>{
        // console.log(req.body.criterio)
        this.cuentasServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')
    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.cuentasServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getModeloNegocio = ( req:Request, res:Response ) =>{
        this.cuentasServicio.getModeloNegocio()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    getDivisa = ( req:Request, res:Response ) =>{
        this.cuentasServicio.getDivisa()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    setEliminarCuenta = ( req:Request, res:Response ) =>{


        this.cuentasServicio.setEliminarCuenta( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    cargaCuentaId = ( req:Request, res:Response ) =>{

        this.cuentasServicio.cargaCuentaId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaCuenta = ( req:Request, res:Response ) =>{
        
        const [ error, editaCuentaDto ] = EditaCuentaDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.cuentasServicio.setActualizaCuenta( editaCuentaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaCuenta = ( req:Request, res:Response ) =>{

        const [ error, agregarCuentaDto ] = AgregaCuentaDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.cuentasServicio.agregaCuenta( agregarCuentaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
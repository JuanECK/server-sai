import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { MovPresupuestoServicio } from "../services/movPresupuesto.service";
import { AgregarAbonoDto } from "../../core/DTOS/MovPresupuesto/agrega-Abono.dto";
import { ActualizaAbonoDto } from "../../core/DTOS/MovPresupuesto/actualiza-Abono.dto";
import { ModificacionPresupuestoDto } from "../../core/DTOS/MovPresupuesto/actualiza-Modificacion.dto";


export class MovPresupuestoControlador {

    constructor(
        public readonly movProveedorServicio:MovPresupuestoServicio,
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

    setInsertaPresupuestoMensual = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.setInsertaPresupuestoMensual( req.body.presupuesto )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )

    }

    getHistorico = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getHistorico()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }
    getPresupuestoMensual = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getPresupuestoMensual()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    cargaMovPresupuestoId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovPresupuestoId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    // cargaEstatusPagadoId = ( req:Request, res:Response ) =>{

    //     this.movProveedorServicio.cargaEstatusPagadoId(req.body.id)
    //     .then( ( response ) => res.json( response ) )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }

    setModificacionPresupuestoMensual = ( req:Request, res:Response ) =>{
        
        const [ error, modificacionPresupuestoDto ] = ModificacionPresupuestoDto.crear( req.body.modificacion )
        if( error ) return res.status( 400 ).json( { error } )


        this.movProveedorServicio.setModificacionPresupuestoMensual( modificacionPresupuestoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaAbonoMensual = ( req:Request, res:Response ) =>{
        
        const [ error, actualizaAbonoDto ] = ActualizaAbonoDto.crear( req.body.abono )
        if( error ) return res.status( 400 ).json( { error } )


        this.movProveedorServicio.setActualizaAbonoMensual( actualizaAbonoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaAbonoPresupuestoMensual = ( req:Request, res:Response ) =>{

        const [ error, agregarAbonoDto ] = AgregarAbonoDto.crear( req.body.abono )
        if( error ) return res.status( 400 ).json( { error } )

        this.movProveedorServicio.agregaAbonoPresupuestoMensual( agregarAbonoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }
    // cambiaEstatusPagado = ( req:Request, res:Response ) =>{

    //     const [ error, cambiaEstatusPagadoDto ] = CambiaEstatusPagadoDto.crear( req.body.formulario )
    //     if( error ) return res.status( 400 ).json( { error } )

    //     this.movProveedorServicio.cambiaEstatusPagado( cambiaEstatusPagadoDto! )
    //     .then( ( resultado ) => { res.json( resultado ) } )
    //     .catch( error => this.manejadorErrores( error, res ) )

    // }


}
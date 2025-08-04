import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { UploadedFile } from "express-fileupload";
import { MovComisionesServicio } from "../services/movComisiones.service";
import { ActualizaMovComisionesDto } from "../../core/DTOS/MovComisiones/actualiza-MovComisiones.dto";
import { AgregarMovComisionesDto } from "../../core/DTOS/MovComisiones/agrega-MovComisiones.dto";


export class MovComisionesControlador {

    constructor(
        public readonly movProveedorServicio:MovComisionesServicio,
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

    getComisionistaComision = ( req:Request, res:Response ) =>{
        this.movProveedorServicio.getComisionistaComision( req.body.comisionista )
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


    cargaMovComisionesId = ( req:Request, res:Response ) =>{

        this.movProveedorServicio.cargaMovComisionesId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaMovComisiones = ( req:Request, res:Response ) =>{

        
        const [ error, actualizaMovComisionesDto ] = ActualizaMovComisionesDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )


        this.movProveedorServicio.setActualizaMovComisiones( actualizaMovComisionesDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.movProveedorServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaMovComisiones = ( req:Request, res:Response ) =>{

        const [ error, agregarMovComisionesDto ] = AgregarMovComisionesDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.movProveedorServicio.agregaMovComisiones( agregarMovComisionesDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }


}
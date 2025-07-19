import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { PublicoServicio } from "../services/publico.service";
import { EditaProveedorDto } from "../../core/DTOS/proveedor/edita-proveedor.dto";
import { AgregaPublicoDto } from "../../core/DTOS/publico/agrega-publico.dto";
import { EditaPublicoDto } from "../../core/DTOS/publico/edita-publico.dto";


export class PublicoControlador {

    constructor(
        public readonly publicoServicio:PublicoServicio,
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
        this.publicoServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }

    getDataInicial = ( req:Request, res:Response ) =>{

        this.publicoServicio.getDataInicial()
        .then(( data ) => res.json( data ))
        .catch( error => this.manejadorErrores( error, res ) )

    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.publicoServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    setEliminarPublico = ( req:Request, res:Response ) =>{


        this.publicoServicio.setEliminarPublico( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    cargaPublicoId = ( req:Request, res:Response ) =>{

        this.publicoServicio.cargaPublicoId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaPublico = ( req:Request, res:Response ) =>{
        

        const [ error, editaPublicoDto ] = EditaPublicoDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.publicoServicio.setActualizaPublico( editaPublicoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaPublico = ( req:Request, res:Response ) =>{

        const [ error, agregarPublicoDto ] = AgregaPublicoDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.publicoServicio.agregaPublico( agregarPublicoDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
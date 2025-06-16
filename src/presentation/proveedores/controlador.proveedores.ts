import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ProveedoresServicio } from "../services/proveedores.service";
import { AgregaProveedorDto } from "../../core/DTOS/proveedor/agrega-proveedor.dto";
import { EditaProveedorDto } from "../../core/DTOS/proveedor/edita-proveedor.dto";


export class ProveedoresControlador {

    constructor(
        public readonly proveedoresServicio:ProveedoresServicio,
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
        this.proveedoresServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.proveedoresServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    setEliminarProveedor = ( req:Request, res:Response ) =>{


        this.proveedoresServicio.setEliminarProveedor( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }



    cargaProveedorId = ( req:Request, res:Response ) =>{

        this.proveedoresServicio.cargaProveedorId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaProveedor = ( req:Request, res:Response ) =>{
        

        const [ error, editaProveedorDto ] = EditaProveedorDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.proveedoresServicio.setActualizaProveedor( editaProveedorDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaProveedor = ( req:Request, res:Response ) =>{

        const [ error, agregarProveedorDto ] = AgregaProveedorDto.crear( req.body.formulario )
        if( error ) return res.status( 400 ).json( { error } )

        this.proveedoresServicio.agregaProveedor( agregarProveedorDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
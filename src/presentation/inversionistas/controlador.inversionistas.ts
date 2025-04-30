import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ClientesServicio } from "../services/clientes.service";
import { AgregarComisionistaDto } from "../../core/DTOS/Comisionista/agrega-comisionista.dto";
import { UploadedFile } from "express-fileupload";
import { RegistraInversionistaDto } from "../../core/DTOS/Comisionista/registra-inversionista.dto";
import { InversionistasServicio } from "../services/inversionistas.service";
import { AgregarInversionistaDto } from "../../core/DTOS/inversionista/agrega-inversionista.dto";


export class InversionistasControlador {

    constructor(
        public readonly inversionistasServicio:InversionistasServicio,
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
        this.inversionistasServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.inversionistasServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    cargaInversionistaId = ( req:Request, res:Response ) =>{

        this.inversionistasServicio.cargaInversionistaId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaInversionista = ( req:Request, res:Response ) =>{

        
        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
        const comprobantesNames = {NameDomicilio:req.body.NameDomicilio, NameIdentificacion:req.body.NameIdentificacion} 
        
        // console.log( req.body )

        const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body )
        // const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body, '2' )
        if( error ) return res.status( 400 ).json( { error } )

        // console.log(files)
        // console.log(agregarComisionistaDto)

        // res.json({ mensaje: 'Registro exitoso' })


        this.inversionistasServicio.setActualizaInversionista( files, comprobantesNames, `uploads/${ type }`, agregarComisionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    registraInversionista = ( req:Request, res:Response ) =>{


        const [ error, registraInversionistaDto ] = RegistraInversionistaDto.crear ( req.body )
        // const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.inversionistasServicio.registraInversionista( registraInversionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.inversionistasServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaInversionista = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]
       

        const [ error, agregarInversionistaDto ] = AgregarInversionistaDto.crear( req.body )
        // const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.inversionistasServicio.AgregaInversionista( files, `uploads/${ type }`, agregarInversionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
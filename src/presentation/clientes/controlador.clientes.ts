import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ClientesServicio } from "../services/clientes.service";
import { AgregarComisionistaDto } from "../../core/DTOS/Comisionista/agrega-comisionista.dto";
import { UploadedFile } from "express-fileupload";
import { RegistraInversionistaDto } from "../../core/DTOS/Comisionista/registra-inversionista.dto";


export class ClientesControlador {

    constructor(
        public readonly clientesServicio:ClientesServicio,
    ){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
    
        }

    getEstado = ( req:Request, res:Response ) => {
        
        this.clientesServicio.getEstado()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }
    getReferidoComisionista = ( req:Request, res:Response ) => {
        
        this.clientesServicio.getReferidoComisionista()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }

    getReferidoBRK = ( req:Request, res:Response ) => {
        
        this.clientesServicio.getReferidoBRK()
        .then(( estado ) => res.json( estado ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exitosa')

    }

    getMunicipio = ( req:Request, res:Response ) => {
       
        this.clientesServicio.getMunicipio( req.body.estado )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        
    }

    getBusqueda = ( req:Request, res:Response ) =>{

        // console.log(req.body.criterio)
        this.clientesServicio.getBusqueda( req.body.criterio )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        // res.json('exito')

    }

    BusquedaAll = ( req:Request, res:Response ) =>{
        this.clientesServicio.BusquedaAll()
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )
    }

    cargaComisionistaId = ( req:Request, res:Response ) =>{

        this.clientesServicio.cargaComisionistaId(req.body.id)
        .then( ( response ) => res.json( response ) )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setActualizaComisionista = ( req:Request, res:Response ) =>{

        
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


        this.clientesServicio.setActualizaComisionista( files, comprobantesNames, `uploads/${ type }`, agregarComisionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    registraInversionista = ( req:Request, res:Response ) =>{


        const [ error, registraInversionistaDto ] = RegistraInversionistaDto.crear ( req.body )
        // const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.clientesServicio.registraInversionista( registraInversionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    setEliminarRegistro = ( req:Request, res:Response ) =>{


        this.clientesServicio.setEliminarRegistro( req.body )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    agregaComisionista = ( req:Request, res:Response ) =>{

        const type = req.params.type;
        const files = req.body.files as UploadedFile[]

        const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body )
        // const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body, '1' )
        if( error ) return res.status( 400 ).json( { error } )

        this.clientesServicio.AgregaComisionista( files, `uploads/${ type }`, agregarComisionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
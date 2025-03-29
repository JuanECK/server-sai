import { Response, Request } from "express";
import { GeneraError } from "../../core";
import { ClientesServicio } from "../services/clientes.service";
import { AgregarComisionistaDto } from "../../core/DTOS/Comisionista/agrega-comisionista.dto";
import { UploadedFile } from "express-fileupload";


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

    getMunicipio = ( req:Request, res:Response ) => {
       
        this.clientesServicio.getMunicipio( req.body.estado )
        .then(( municipio ) => res.json( municipio ))
        .catch( error => this.manejadorErrores( error, res ) )
        
    }

    agregaComisionista = ( req:Request, res:Response ) =>{

        // console.log(req.body)
        const type = req.params.type;
        const file = req.body.files as UploadedFile[]
        // const file = req.body.files.at(0) as UploadedFile;
        // console.log(file)

        const [ error, agregarComisionistaDto ] = AgregarComisionistaDto.crear( req.body )
        if( error ) return res.status( 400 ).json( { error } )

        this.clientesServicio.AgregaComisionista( agregarComisionistaDto! )
        .then( ( resultado ) => { res.json( resultado ) } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

}
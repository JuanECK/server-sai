import { Request , Response } from "express";
import { GeneraError } from "../../core";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.service";


export class FileUploadControlador {

constructor(
    private readonly fileUploadService = new FileUploadService,
){}

        private manejadorErrores = ( error: unknown, res:Response ) => {
    
            if( error instanceof GeneraError ) {
                return res.status( error.codigoEstatus ).json( {error: error.mensaje} )
            }
    
            console.log(` ${error} `);
            return res.status( 500 ).json( {error:'Error interno del servidor'} );
    
        }


    uploadFile = async ( req:Request, res:Response ) => {
        const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
        .then( uploaded => res.json( uploaded ) )
        .catch( error => this.manejadorErrores( error, res) ) 
    }  

}
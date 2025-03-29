import { Uuid } from "../../config/uuid.adapter";
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import path from "path";
import { GeneraError } from "../../core";
import { CalculaMB } from "../../config/calculaMB.adapter";

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4 ){}

    private checkFolder( folderPath:string ){
        if ( !fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath)
        }
    }

    async uploadSingle( file:UploadedFile, folder:string = 'uploads', validExtensions:string[] = ['pdf'] ){
    // async uploadSingle( file:UploadedFile, folder:string = 'uploads', validExtensions:string[] = ['png','jpg','jpeg','pdf'] ){

        try{
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            if( !validExtensions.includes( fileExtension ) ){
                throw GeneraError.badRespuesta( `Extension invalida: ${ fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}` )
                // throw new Error( `Extension invalida: ${ fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}` )
            }

            if( file.size > 1 * 1024 * 1024 ){

                throw GeneraError.badRespuesta( `Tamaño de archivo excedido: ${ CalculaMB.bytesToSize(file.size) }, !!Solo se admiten archivos de 1MB` )
                // throw GeneraError.badRespuesta( `Tamaño de archivo excedido: ${ file.size } bytes, !!Solo se admiten archivos de 1MB` )

            }


            const destination = path.resolve( __dirname, '../../../', folder );
            this.checkFolder( destination );
            
            const fileName = `${ this.uuid() }.${ fileExtension }`

            file.mv(`${ destination }/${ fileName }`)


            return {fileName}

        }
        catch ( error ){
            console.log( error )
            throw error
            

        }

    }

}

import { Response, Request } from "express";
import fs from 'fs';
import path from "path";


export class FileDownloadControlador {

constructor(){};

        downloadFile = async ( req:Request, res:Response ) => {

            const { type='', fileName='' } = req.params;

            const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${fileName}`, )
            if( !fs.existsSync(imagePath) ){
                return res.status( 400 ).json( 'Imagen no encontrada' );
            }

            res.sendFile( imagePath )

        }

}
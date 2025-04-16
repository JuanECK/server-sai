
import { Response, Request } from "express";
import fs from 'fs';
import path from "path";


export class FileDownloadControlador {

constructor(){};

        downloadFile = async ( req:Request, res:Response ) => {

            const { type='', fileName='' } = req.params;
            console.log(req.params)

            const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${fileName}`, )
            if( !fs.existsSync(imagePath) ){
                return res.status( 400 ).json( {error:'No se encotro un PDF asociado'} );
            }

            res.sendFile( imagePath )

        }

}
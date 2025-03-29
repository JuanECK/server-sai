import { NextFunction, Request, Response } from "express";


export class FileUploadMiddelware {

    static containFiles( req:Request, res:Response, next:NextFunction ){

        if( !req.files || Object.keys( req.files ).length ===0 ){
            return res.status( 400 ).json( { mensaje:`No hay ningun archivo PDF seleccionado para cargar`} )
        }
        if( !Array.isArray( req.files.file ) ){
            req.body.files = [ req.files.file ]
        }else{
            req.body.files = req.files.file
        }

        next();
    }
}
import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {

    static validTypes( validtypes:string[] ){
        return ( req:Request, res:Response, next:NextFunction ) =>{

            const type = req.url.split('/').at(2) ?? '';
            // console.log({type:type})
            if( !validtypes.includes( type ) ){
                return res.status(400).json( {error:` Carpeta de destino no valida: ${"'"+type+"'"}, solo se admiten estas carpetas: ${validtypes}`} )
            }

            next();
        }
    }
}
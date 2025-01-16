import { getRandomValues } from "crypto";


export class GeneraError extends Error {

    constructor(
        public readonly codigoEstatus:number,
        public readonly mensaje:string,
    ){
        super(mensaje);
    }

    static badRespuesta( mensaje: string ){
        return new GeneraError( 400, mensaje )
    }

    static noAutorizado( mensaje: string){
        return new GeneraError( 401, mensaje );
    }

    static prohibido( mensaje:string ){
        return new GeneraError( 403, mensaje )
    }

    static noEncontrado( mensaje:string ){
        return new GeneraError( 404, mensaje )
    }

    static servidorInterno( mensaje:string){
        console.log(mensaje)
        return new GeneraError( 500, mensaje )
    }

}
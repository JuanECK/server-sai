import { GeneraError } from "../errors/generaError";

export class UsuarioEntidad{

    constructor(
        public nombre: string,
        public emaii: string,
        public password: string,
        public claveUnica: string,
      ) { }

      static formularioObjeto( objeto: { [ key:string ]: any } ) {

        const { _id, nombre, email, password, claveUnica } = objeto;
        if( !_id ) {
          throw GeneraError.badRespuesta( 'Falta el ID' );
        }

        if ( !nombre ) throw GeneraError.badRespuesta( 'Falta el Nombre' )
        if ( !email ) throw GeneraError.badRespuesta( 'Falta el E-mail' )
        if ( !password ) throw GeneraError.badRespuesta( 'Falta el Password' )
        if ( !claveUnica ) throw GeneraError.badRespuesta( 'Falta la claveUnica' )

      
          return new UsuarioEntidad( nombre, email, password, claveUnica );
      }
}
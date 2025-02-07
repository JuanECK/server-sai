import { GeneraError } from "../errors/generaError";

export class UsuarioEntidad{

    constructor(
        public Id_User:number,
        public Id_Perfil:number,
        public Nombre_Completo:string,
        public Usuario:string,
        public Contrasenia:string,
        public Clave_Usuario:string,
        public Datos:any,
        
      ) { }

      static formularioObjeto( objeto: { [ key:string ]: any } ) {

        const { Id_User, Id_Perfil, Nombre_Completo, Usuario, Contrasenia, Clave_Usuario, Datos } = objeto;
        if( !Id_User ) {
          throw GeneraError.badRespuesta( 'Falta el ID' );
        }
        if( !Id_Perfil ) {
          throw GeneraError.badRespuesta( 'Falta el Perfil' );
        }
        // console.log(Id_User)
        if ( !Nombre_Completo ) throw GeneraError.badRespuesta( 'Falta el Nombre' )
        if ( !Usuario ) throw GeneraError.badRespuesta( 'Falta el E-mail' )
        if ( !Contrasenia ) throw GeneraError.badRespuesta( 'Falta el Password' )
        if ( !Clave_Usuario ) throw GeneraError.badRespuesta( 'Falta la claveUnica' )

      
          return new UsuarioEntidad(Id_User,Id_Perfil,Nombre_Completo, Usuario, Contrasenia, Clave_Usuario, Datos );
      }
}
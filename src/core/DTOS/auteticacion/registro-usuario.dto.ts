
import { regularExpsEmail } from "../../../config";
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//---------------PARA EVALUAR QUE LOS DATOS QUE EL USUARIO ENVIA SEAN CORRECTOS-------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
export class RegistroUsusarioDto {

    private constructor(
        public Nombre_Completo:string,
        public Area:string,
        public Id_Perfil:string,
        public Usuario:string,
        public Contrasenia:string,
        public Estatus:string,
        public Clave_Usuario:string,
        public createAt:string,
    ){}

    static crear( objeto: { [key:string]:any } ):[string?, RegistroUsusarioDto?]{
        // const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt, } = objeto;
        const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt = new Date().toLocaleString() } = objeto;

        if( !Nombre_Completo ) return ['Falta el Nombre'];
        if( !Area ) return ['Falta el Area'];
        if( !Id_Perfil ) return ['Falta el Id Perfil'];
        if( !regularExpsEmail.email.test( Usuario ) ) return ['El e-mail no es valido'];
        if( !Contrasenia ) return ['Falta la contraseña']
        if ( Contrasenia.length < 6 ) return ['La contraseña es muy corta, deveria tener al menos 6 caracteres'];
        if( !Estatus ) return ['Falta iindicar un estatus'];
        if( !Clave_Usuario ) return ['Falta la clave unica'];
        // if( !createAt ) return ['Falta la fecha de creacion'];

        return [undefined, new RegistroUsusarioDto( 
            Nombre_Completo,
            Area,
            Id_Perfil,
            Usuario,
            Contrasenia,
            Estatus,
            Clave_Usuario,
            createAt,
         )];
    }
}
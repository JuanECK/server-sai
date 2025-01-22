
import { regularExpsEmail } from "../../../config";


export class LoginUsusarioDto {

    private constructor(
        // public Nombre_Completo:string,
        public Usuario:string,
        public Contrasenia:string,
        // public Clave_Usuario:string,
    ){}

    static crear( objeto: { [key:string]:any } ):[string?, LoginUsusarioDto?]{
        const {  Usuario, Contrasenia, } = objeto;

        // if( !Nombre_Completo ) return ['Falta el Nombre'];
        if( !regularExpsEmail.email.test( Usuario ) ) return ['El e-mail no es valido'];
        if( !Contrasenia ) return ['Falta la contraseña']
        if ( Contrasenia.length < 6 ) return ['La contraseña es muy corta, deveria tener al menos 6 caracteres'];
        // if( !Clave_Usuario ) return ['Falta la clave unica'];
        // if( !createAt ) return ['Falta la fecha de creacion'];

        return [undefined, new LoginUsusarioDto( 
            Usuario,
            Contrasenia,
         )];
    }
}
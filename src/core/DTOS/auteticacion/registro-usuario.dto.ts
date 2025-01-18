import { regularExpsEmail } from "../../../config";


export class RegistroUsusarioDto {

    private constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public perfil:string,
        public claveUnica:string,
    ){}

    static crear( objeto: { [key:string]:any } ):[string?, RegistroUsusarioDto?]{
        const { nombre, email, password, perfil, claveUnica } = objeto;

        if( !nombre ) return ['Falta el Nombre'];
        if( !email ) return ['Falta el E-mail'];
        if( !regularExpsEmail.email.test( email ) ) return ['El e-mail no es valido'];
        if( !password ) return ['Falta el password']
        if ( password.length < 6 ) return ['Password muy corto, deveria tener al menos 6 caracteres'];
        if( !perfil ) return ['Falta indicar un perfil'];
        if( !claveUnica ) return ['Falta la clave unica'];

        return [undefined, new RegistroUsusarioDto( nombre, email, password, perfil, claveUnica )];
    }
}
import { regularExpsEmail } from "../../../config";


export class AgregaProveedorDto {

    private constructor(

        public nombre: string,
        public fisica_moral: string,
        public correo: string,
        public telefono: string,
        public actividad: string,
        public usuario: string,
        public RFC: string,
        public Banco_cuenta: string,
        public CLABE: string,
        public Banco_tarjeta: string,
        public tarjeta: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregaProveedorDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            nombre,
            fisica_moral,
            correo,
            telefono,
            actividad,
            usuario,
            RFC,
            Banco_cuenta,
            CLABE,
            Banco_tarjeta,
            tarjeta,

        } = objeto;
            if(!nombre) return ['Falta  Nombre o Razón social']
            if( correo ){
                if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']
            }

        return [ undefined, new AgregaProveedorDto (
            nombre,
            fisica_moral,
            correo,
            telefono,
            actividad,
            usuario,
            RFC,
            Banco_cuenta,
            CLABE,
            Banco_tarjeta,
            tarjeta,
        )]
    }
}
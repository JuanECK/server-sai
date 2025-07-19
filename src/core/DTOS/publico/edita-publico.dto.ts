import { regularExpsEmail } from "../../../config";


export class EditaPublicoDto {

    private constructor(

        public nombre: string,
        public fisica_moral: string,
        public correo: string,
        public telefono: string,
        public Id_ICPC: string,
        public usuario: string,
        public Banco_cuenta: string,
        public CLABE: string,
        public FINCASH: string,
        public Banco_tarjeta: string,
        public tarjeta: string,
        public Estatus: string,
        public tipoClienteDivisa : string,
        public tipoDivisa : string,
        public saldoApertura : string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, EditaPublicoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            nombre,
            fisica_moral,
            correo,
            telefono,
            Id_ICPC,
            usuario,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_tarjeta,
            tarjeta,
            Estatus,
            tipoClienteDivisa,
            tipoDivisa,
            saldoApertura,

        } = objeto;
            if(!nombre) return ['Falta  Nombre o Razón social']
            if( correo ){
                if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']
            }

        return [ undefined, new EditaPublicoDto (
            nombre,
            fisica_moral,
            correo,
            telefono,
            Id_ICPC,
            usuario,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_tarjeta,
            tarjeta,
            Estatus,
            tipoClienteDivisa,
            tipoDivisa,
            saldoApertura,
        )]
    }
}
import { regularExpsEmail } from "../../../config";


export class AgregaPublicoDto {

    private constructor(

        public nombre: string,
        public fisica_moral: string,
        public correo: string,
        public telefono: string,
        public usuario: string,
        // public Id_ICPC: string,
        public Banco_cuenta: string,
        public CLABE: string,
        public FINCASH: string,
        public Banco_tarjeta: string,
        public tarjeta: string,
        // public Estatus: string,
        public tipoClienteDivisa : string,
        public tipoDivisa : string,
        public saldoApertura : string,
        public utilidad : string,
        public comision : string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregaPublicoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            nombre,
            fisica_moral,
            correo,
            telefono,
            usuario,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_tarjeta,
            tarjeta,
            tipoClienteDivisa,
            tipoDivisa,
            saldoApertura,
            utilidad,
            comision,
            // Id_ICPC,
            // Estatus,

        } = objeto;
            if(!nombre) return ['Falta  Nombre o Razón social']
            if( correo ){
                if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']
            }

        return [ undefined, new AgregaPublicoDto (
            nombre,
            fisica_moral,
            correo,
            telefono,
            usuario,
            // Id_ICPC,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_tarjeta,
            tarjeta,
            tipoClienteDivisa,
            tipoDivisa,
            saldoApertura,
            utilidad,
            comision,
            // Estatus,
        )]
    }
}
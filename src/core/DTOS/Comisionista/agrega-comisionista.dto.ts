import { regularExpsEmail } from "../../../config";


export class AgregarComisionistaDto {

    private constructor(
        public nombre: string,
        public fisica_moral: boolean,
        public correo: string,
        public telefono: string,
        public usuario: string,
        public banco_cuenta: string,
        public CLABE: string,
        public fincash: string,
        public Banco_tarjeta: string,
        public tarjeta: string,
        public RFC: string,
        public Comprobante_domicilio: string,
        public INE: string,
        public Referido: string,
        public Fecha_contrato: string,
        public Calle: string,
        public No_Exterior: string,
        public No_Interior: string,
        public Colonia: string,
        public Id_Estado: string,
        public Id_Municipio: string,
        public CP: string,
    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarComisionistaDto?] {
        const { nombre,
            fisica_moral,
            correo,
            telefono,
            usuario,
            banco_cuenta,
            CLABE,
            fincash,
            Banco_tarjeta,
            tarjeta,
            RFC,
            Comprobante_domicilio,
            INE,
            Referido,
            Fecha_contrato,
            Calle,
            No_Exterior,
            No_Interior,
            Colonia,
            Id_Estado,
            Id_Municipio,
            CP, } = objeto;

            if(!nombre) return ['Falta  Nombre o Razón social']
            if(!fisica_moral) return ['Falta Persona Fisica o Moral']
            if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']
            if(!telefono) return ['Falta Numero Telefonico valido']
            if(!usuario) return ['Falta ID']
            // if(!banco_cuenta) return ['Falta una cuenta de banco']
            // if(!CLABE) return ['Falta numero de Clave']
            // if(!fincash) return ['Falta numero de Cuenta Fincash']
            // if(!Banco_tarjeta) return ['Falta ']
            // if(!tarjeta) return ['Falta ']
            // if(!RFC) return ['Falta ']
            // if(!Comprobante_domicilio) return ['Falta ']
            // if(!INE) return ['Falta ']
            // if(!Referido) return ['Falta ']
            // if(!Fecha_contrato) return ['Falta ']
            if(!Calle) return ['Falta ']
            // if(!No_Exterior) return ['Falta ']
            // if(!No_Interior) return ['Falta ']
            // if(!Colonia) return ['Falta ']
            if(!Id_Estado) return ['Falta ']
            if(!Id_Municipio) return ['Falta ']
            // if(!CP) return ['Falta']

            // continuar
        return [ undefined, new AgregarComisionistaDto (
            nombre,
            fisica_moral,
            correo,
            telefono,
            usuario,
            banco_cuenta,
            CLABE,
            fincash,
            Banco_tarjeta,
            tarjeta,
            RFC,
            Comprobante_domicilio,
            INE,
            Referido,
            Fecha_contrato,
            Calle,
            No_Exterior,
            No_Interior,
            Colonia,
            Id_Estado,
            Id_Municipio,
            CP
        )]
    }
}
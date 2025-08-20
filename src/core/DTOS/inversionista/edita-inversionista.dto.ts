import { regularExpsEmail } from "../../../config";


export class EdicionInversionistaDto {

    private constructor(
        public Id_ICPC: string,
        public nombre: string,
        public fisica_moral: boolean,
        public correo: string,
        public telefono: string,
        public BRK: string,
        public usuario: string,
        public Fecha_Nac: string,
        public RFC: string,
        public Beneficiario1: string,
        public Fecha_Nac_Beneficiario1: string,
        public Porcentaje_Beneficiario1: string,
        public Beneficiario2: string,
        public Fecha_Nac_Beneficiario2: string,
        public Porcentaje_Beneficiario2: string,
        public Beneficiario3: string,
        public Fecha_Nac_Beneficiario3: string,
        public Porcentaje_Beneficiario3: string,
        public Beneficiario4: string,
        public Fecha_Nac_Beneficiario4: string,
        public Porcentaje_Beneficiario4: string,
        public Beneficiario5: string,
        public Fecha_Nac_Beneficiario5: string,
        public Porcentaje_Beneficiario5: string,
        public Banco_cuenta: string,
        public CLABE: string,
        public FINCASH: string,
        public Banco_Tarjeta: string,
        public Tarjeta: string,
        public INE: string,
        public Comprobante_Domicilio: string,
        public Recomendado: string,
        public Fecha_Contrato: string,
        public Calle: string,
        public No_Exterior: string,
        public No_Interior: string,
        public Colonia: string,
        public Id_Estado: string,
        public Id_Municipio: string,
        public CP: string,
        public estatus: string,
        public Id_Pais: string,
    ) { }

    static crear(objeto: { [key: string]: any }): [string?, EdicionInversionistaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_ICPC,
            nombre,
            fisica_moral,
            correo,
            telefono,
            BRK,
            usuario,
            Fecha_Nac,
            RFC,
            Beneficiario1,
            Fecha_Nac_Beneficiario1,
            Porcentaje_Beneficiario1,
            Beneficiario2,
            Fecha_Nac_Beneficiario2,
            Porcentaje_Beneficiario2,
            Beneficiario3,
            Fecha_Nac_Beneficiario3,
            Porcentaje_Beneficiario3,
            Beneficiario4,
            Fecha_Nac_Beneficiario4,
            Porcentaje_Beneficiario4,
            Beneficiario5,
            Fecha_Nac_Beneficiario5,
            Porcentaje_Beneficiario5,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_Tarjeta,
            Tarjeta,
            INE,
            Comprobante_Domicilio,
            Recomendado,
            Fecha_Contrato,
            Calle,
            No_Exterior,
            No_Interior,
            Colonia,
            Id_Estado,
            Id_Municipio,
            CP,
            estatus,
            Id_Pais,
        } = objeto;

            if(!nombre) return ['Falta  Nombre o Razón social']
            // if(!fisica_moral) return ['Falta Persona Fisica o Moral']
            if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']
            if(!telefono) return ['Falta Numero Telefonico valido']
            if(!BRK) return ['Falta Numero de BRK']
            // if(!usuario) return ['Falta ID']
            if(!Fecha_Nac) return ['Falta fecha de nacimiento del inversionista']
            if(!Beneficiario1) return ['Debe haber almenos un beneficiario']
            if(!Fecha_Nac_Beneficiario1) return ['Debe haber almenos un beneficiario']
            if(!Porcentaje_Beneficiario1) return ['Debe haber almenos un beneficiario']
            if(!Recomendado) return ['Falta comisionista referente']
            if(!Calle) return ['Falta la Calle']
            if(!Id_Estado) return ['Falta el Estado']
            if(!Id_Municipio) return ['Falta el Municipio']

        return [ undefined, new EdicionInversionistaDto (
            Id_ICPC,
            nombre,
            fisica_moral,
            correo,
            telefono,
            BRK,
            usuario,
            Fecha_Nac,
            RFC,
            Beneficiario1,
            Fecha_Nac_Beneficiario1,
            Porcentaje_Beneficiario1,
            Beneficiario2,
            Fecha_Nac_Beneficiario2,
            Porcentaje_Beneficiario2,
            Beneficiario3,
            Fecha_Nac_Beneficiario3,
            Porcentaje_Beneficiario3,
            Beneficiario4,
            Fecha_Nac_Beneficiario4,
            Porcentaje_Beneficiario4,
            Beneficiario5,
            Fecha_Nac_Beneficiario5,
            Porcentaje_Beneficiario5,
            Banco_cuenta,
            CLABE,
            FINCASH,
            Banco_Tarjeta,
            Tarjeta,
            INE,
            Comprobante_Domicilio,
            Recomendado,
            Fecha_Contrato,
            Calle,
            No_Exterior,
            No_Interior,
            Colonia,
            Id_Estado,
            Id_Municipio,
            CP,
            estatus,
            Id_Pais,
        )]
    }
}
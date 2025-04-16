import { regularExpsEmail } from "../../../config";


export class RegistraInversionistaDto {

    private constructor(
        public usuario: string,
        public Id_ICPC: string,
        public BRK: string,
        public Fecha_Nac: string,
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
        public Recomendado: string,
        public Fecha_Contrato: string,
        public estatus: string,
    ) { }

    static crear(objeto: { [key: string]: any }): [string?, RegistraInversionistaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            usuario,
            Id_ICPC,
            BRK,
            Fecha_Nac,
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
            Recomendado,
            Fecha_Contrato,
            estatus,
        } = objeto;

            if(!usuario) return ['Falta ID usuario responsable']
            if(!Id_ICPC) return ['Falta ID usuario']
            if(!BRK) return ['Falta el BRK']
            // if(!Fecha_Nac) return ['Falta Numero Telefonico valido']
            if(!Beneficiario1) return ['Falta el nombre del beneficiario']
            if(!Fecha_Nac_Beneficiario1) return ['Falta fecha de nacimiento del beneficiario']
            if(!Porcentaje_Beneficiario1) return ['Falta un porcentaje para el beneficiario']
            // if(!Beneficiario2) return ['Falta numero de Cuenta Fincash']
            // if(!Fecha_Nac_Beneficiario2) return ['Falta ']
            // if(!Porcentaje_Beneficiario2) return ['Falta ']
            // if(!Beneficiario3) return ['Falta ']
            // if(!Fecha_Nac_Beneficiario3) return ['Falta ']
            // if(!Porcentaje_Beneficiario3) return ['Falta ']
            // if(!Beneficiario4) return ['Falta una referencia Interna']
            // if(!Fecha_Nac_Beneficiario4) return ['Falta ']
            // if(!Porcentaje_Beneficiario4) return ['Falta ']
            // if(!Beneficiario5) return ['Falta ']
            // if(!Fecha_Nac_Beneficiario5) return ['Falta ']
            // if(!Porcentaje_Beneficiario5) return ['Falta ']
            if(!Recomendado) return ['Falta el nombre de la persona que recomendo']
            // if(!Fecha_Contrato) return ['Falta ']
            // if(!estatus) return ['Falta']

            // continuar
        return [ undefined, new RegistraInversionistaDto (
            usuario,
            Id_ICPC,
            BRK,
            Fecha_Nac,
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
            Recomendado,
            Fecha_Contrato,
            estatus,
        )]
    }
}
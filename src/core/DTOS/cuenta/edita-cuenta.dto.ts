import { regularExpsEmail } from "../../../config";


export class EditaCuentaDto {

    private constructor(

        public Id_cuenta: string,
        public nombreBanco: string,
        public noCuenta: string,
        public saldoInicial: string,
        public clabe: string,
        public tarjeta: string,
        public alias: string,
        public moneda: string,
        public modelo: string,
        public estatus: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, EditaCuentaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Id_cuenta,
            nombreBanco,
            noCuenta,
            saldoInicial,
            clabe,
            tarjeta,
            alias,
            moneda,
            modelo,
            estatus,
            usuario,

        } = objeto;

        if(!clabe) return ['Falta el numero de cuenta CLABE']
        if(!nombreBanco) return ['Falta la Institución Bancaria']
        if(!alias) return ['Falta el Alias de la cuenta']
        if(!modelo) return ['Falta el  Modelo de Negocio']
        if(!clabe) return ['Falta una Divisa']
        if(!usuario) return ['Falta usuario']

        return [ undefined, new EditaCuentaDto (
            Id_cuenta,
            nombreBanco,
            noCuenta,
            saldoInicial,
            clabe,
            tarjeta,
            alias,
            moneda,
            modelo,
            estatus,
            usuario,
        )]
    }
}
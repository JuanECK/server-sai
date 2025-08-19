
export class AgregaCuentaDto {

    private constructor(

        public nombreBanco: string,
        public noCuenta: string,
        public saldoInicial: string,
        public clabe: string,
        public tarjeta: string,
        public alias: string,
        public moneda: string,
        public modelo: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregaCuentaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            nombreBanco,
            noCuenta,
            saldoInicial,
            clabe,
            tarjeta,
            alias,
            moneda,
            modelo,
            usuario,

        } = objeto;

            if(!clabe) return ['Falta el numero de cuenta CLABE']
            if(!nombreBanco) return ['Falta la Institución Bancaria']
            if(!alias) return ['Falta el Alias de la cuenta']
            if(!modelo) return ['Falta el  Modelo de Negocio']
            // if(!clabe) return ['Falta una Divisa']

            // clabe.replace(/\D/g, "");

        return [ undefined, new AgregaCuentaDto (
            nombreBanco ,
            noCuenta,
            saldoInicial,
            clabe,
            tarjeta,
            alias,
            moneda,
            modelo,
            usuario,
        )]
    }

}
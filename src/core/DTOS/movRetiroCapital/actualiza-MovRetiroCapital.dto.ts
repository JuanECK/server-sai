
export class ActualizaMovRetiroCapitalDto {

        private constructor(

            public Id_RetiroCapital:string,
            public Id_CuentaB: string,
            public monto: string,
            public justificacion: string,
            public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaMovRetiroCapitalDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_RetiroCapital,
            Id_CuentaB,
            monto,
            justificacion,
            usuario,
        } = objeto;

            if(!Id_CuentaB) return ['Falta la cuenta de egreso']
            if(!monto) return ['Falta el Monto']
            if(!justificacion) return ['Falta una observacion']
            if(!usuario) return ['Falta el Usuario']

        return [ undefined, new ActualizaMovRetiroCapitalDto (
            Id_RetiroCapital,
            Id_CuentaB,
            monto,
            justificacion,
            usuario,
        )]
    }
}
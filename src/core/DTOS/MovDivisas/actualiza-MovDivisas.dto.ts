
export class ActualizaMovDivisasDto {

    private constructor(
        public Id_Mov_Div: string,
        public Id_ICPC: string,
        public Concepto: string,
        public Id_CuentaB: string,
        public Comision: string,
        public Observaciones: string,
        public usuario: string,
        public estatus: string,
        public Tipo_Movimiento: string,
        public Monto: string,


    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaMovDivisasDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        let { 
            Id_Mov_Div,
            Id_ICPC,
            Concepto,
            Id_CuentaB,
            Comision,
            Observaciones,
            usuario,
            estatus,
            Tipo_Movimiento,
            Monto,

        } = objeto;

            if(!Concepto) return ['Falta el Concepto']
            if(!Id_ICPC) return ['Falta el Cliente']
            if(!Id_CuentaB) return ['Falta la Cuenta']
            if(!Monto) {Monto = null}

        return [ undefined, new ActualizaMovDivisasDto (
            Id_Mov_Div,
            Id_ICPC,
            Concepto,
            Id_CuentaB,
            Comision,
            Observaciones,
            usuario,
            estatus,
            Tipo_Movimiento,
            Monto,

        )]
    }
}
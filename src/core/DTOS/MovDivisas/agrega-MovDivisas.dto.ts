
export class AgregarMovDivisasDto {

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
        public Tipo_Cuenta: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovDivisasDto?] {
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
            Tipo_Cuenta,
        } = objeto;

            if(!Concepto) return ['Falta el Concepto']
            if(!Id_ICPC) return ['Falta el Cliente']
            if(!Id_CuentaB) return ['Falta la Cuenta']
            if(!Comision) return ['Falta la Comisión ']
            if(!Monto) { Monto = null }

        return [ undefined, new AgregarMovDivisasDto (
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
            Tipo_Cuenta,
        )]
    }
}
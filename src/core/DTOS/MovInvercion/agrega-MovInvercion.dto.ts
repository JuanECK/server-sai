
export class AgregarMovInvercionDto {

    private constructor(
        // public Id_Mov_Inv: string,
        public Id_ICPC: string,
        public Tipo_Movimiento: string,
        public Id_CuentaB: string,
        public Monto: string,
        public Concepto: string,
        public Observaciones: string,
        public Comprobante: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovInvercionDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Inv,
            Id_ICPC,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
        } = objeto;

            if(!Id_ICPC) return ['Falta Id del Inversionista']
            if(!Tipo_Movimiento) return ['Falta el Tipo de Movimiento']
            if(!Monto) return ['Falta el Monto']
            if(!Id_CuentaB) return ['Falta Id de la cuenta']

        return [ undefined, new AgregarMovInvercionDto (
            // Id_Mov_Inv,
            Id_ICPC,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
        )]
    }
}

export class ActualizaMovInvercionDto {

    private constructor(
        public Id_Mov_Inv: string,
        public Id_ICPC: string,
        public Tipo_Movimiento: string,
        public Id_CuentaB: string,
        public Monto: string,
        public Concepto: string,
        public Observaciones: string,
        public Comprobante: string,
        public usuario: string,
        public estatus: string,
        public comprobanteCambio: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaMovInvercionDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_Mov_Inv,
            Id_ICPC,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            estatus,
            comprobanteCambio,
        } = objeto;

            if(!Id_Mov_Inv) return ['Falta Inversionista']
            if(!Id_ICPC) return ['Falta ICPC']
            if(!Tipo_Movimiento) return ['Falta el Tipo de Movimiento']
            if(!Monto) return ['Falta el Monto']
            if(!Id_CuentaB) return ['Falta el Tipo de Cuenta']
            if(!estatus) return ['Falta el Estatus']

        return [ undefined, new ActualizaMovInvercionDto (
            Id_Mov_Inv,
            Id_ICPC,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            estatus,
            comprobanteCambio,
        )]
    }
}
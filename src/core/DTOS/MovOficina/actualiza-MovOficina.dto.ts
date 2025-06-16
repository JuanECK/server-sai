
export class ActualizaMovOficinaDto {

    private constructor(

        public Id_Mov_Ofi: string, 
        public Id_CuentaB: string, 
        public Monto: string, 
        public Concepto: string, 
        public Observaciones: string, 
        public Comprobante: string, 
        public usuario: string, 
        public estatus: string, 


    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaMovOficinaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_Mov_Ofi,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            estatus,
        } = objeto;

            if(!Id_CuentaB) return ['Falta la Cuenta de pago']
            if(!Concepto) return ['Falta el Concepto']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new ActualizaMovOficinaDto (
            Id_Mov_Ofi,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            estatus,
        )]
    }
}
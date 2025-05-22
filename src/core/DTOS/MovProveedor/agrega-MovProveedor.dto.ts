
export class AgregarMovProveedorDto {

    private constructor(
        // public Id_Mov_Prov: string, 
        public Id_ICPC: string, 
        public Id_CuentaB: string, 
        public Monto: string, 
        public Concepto: string, 
        public Observaciones: string, 
        public Comprobante: string, 
        public usuario: string, 
        // public estatus: string, 

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovProveedorDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Prov,
            Id_ICPC,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            // estatus,
        } = objeto;

            if(!Id_ICPC) return ['Falta el Proveedor']
            if(!Id_CuentaB) return ['Falta la Cuenta de pago']
            if(!Concepto) return ['Falta el Concepto']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new AgregarMovProveedorDto (
            // Id_Mov_Prov,
            Id_ICPC,
            Id_CuentaB,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            // estatus,
        )]
    }
}
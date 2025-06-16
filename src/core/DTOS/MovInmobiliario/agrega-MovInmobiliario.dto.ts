
export class AgregarMovInmobiliarioDto {

    private constructor(
    //    public Id_Mov_Inmo: string,
       public Id_ICPC: string,
       public Id_CuentaB: string,
       public Tipo_Movimiento: string,
       public Monto: string,
       public Concepto: string,
       public Observaciones: string,
       public Comprobante: string,
       public usuario: string,
    //    public estatus: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovInmobiliarioDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Inmo,
            Id_ICPC,
            Id_CuentaB,
            Tipo_Movimiento,
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

        return [ undefined, new AgregarMovInmobiliarioDto (
            // Id_Mov_Inmo,
            Id_ICPC,
            Id_CuentaB,
            Tipo_Movimiento,
            Monto,
            Concepto,
            Observaciones,
            Comprobante,
            usuario,
            // estatus,
        )]
    }
}
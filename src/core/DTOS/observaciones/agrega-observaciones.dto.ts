
export class AgregaObservacionesDto {

    private constructor(

        public Tipo_Movimiento : string,
        public Id_CuentaB : string,
        public Monto : string,
        public Fecha_Ingreso : string,
        public Observaciones : string,
        public usuario : string,
        // public Id_Mov_RN : string,
        // public estatus : string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregaObservacionesDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Fecha_Ingreso,
            Observaciones,
            usuario,
            // Id_Mov_RN,
            // estatus,

        } = objeto;

            if(!Tipo_Movimiento) return ['Falta un Tipo de Movimiento']
            if(!Id_CuentaB) return ['Falta la Cuenta de ingreso']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new AgregaObservacionesDto (
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Fecha_Ingreso,
            Observaciones,
            usuario,
            // Id_Mov_RN,
            // estatus,
        )]
    }

}
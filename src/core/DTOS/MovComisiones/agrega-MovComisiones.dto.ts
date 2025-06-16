
export class AgregarMovComisionesDto {

    private constructor(
        // public Id_Mov_Com: string,
        public Id_ModeloNegocio: string,
        public Id_ICPC: string,
        public Id_CuentaB: string,
        public Tipo_Movimiento: string,
        public Monto: string,
        public Observaciones: string,
        public usuario: string,
        // public estatus: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovComisionesDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Com,
            Id_ModeloNegocio,
            Id_ICPC,
            Id_CuentaB,
            Tipo_Movimiento,
            Monto,
            Observaciones,
            usuario,
            // estatus,
        } = objeto;

            if(!Id_ModeloNegocio) return ['Falta el Modelo de negocio']
            if(!Id_ICPC) return ['Falta el Comisionista']
            if(!Id_CuentaB) return ['Falta la Cuenta asociada']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new AgregarMovComisionesDto (
            // Id_Mov_Com,
            Id_ModeloNegocio,
            Id_ICPC,
            Id_CuentaB,
            Tipo_Movimiento,
            Monto,
            Observaciones,
            usuario,
            // estatus,
        )]
    }
}
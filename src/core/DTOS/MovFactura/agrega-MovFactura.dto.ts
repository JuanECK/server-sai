
export class AgregarMovFacturaDto {

        private constructor(

        // public Id_Mov_Fact:string,
        public Id_Esquema:string,
        public Monto:string,
        public usuario:string,
        public Observaciones:string,
        public Id_CuentaB:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovFacturaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Fact,
            Id_Esquema,
            Monto,
            usuario,
            Observaciones,
            Id_CuentaB
            // estatus,
        } = objeto;

            if(!Id_Esquema) return ['Falta el Esquema']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new AgregarMovFacturaDto (
            // Id_Mov_Fact,
            Id_Esquema,
            Monto,
            usuario,
            Observaciones,
            Id_CuentaB
            // estatus,
        )]
    }
}
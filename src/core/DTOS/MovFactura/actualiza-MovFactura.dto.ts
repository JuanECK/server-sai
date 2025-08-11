
export class ActualizaMovFacturaDto {

        private constructor(

        public Id_Mov_Fact:string,
        public Id_Esquema:string,
        public Monto:string,
        public usuario:string,
        public Estatus_Pagado:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaMovFacturaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_Mov_Fact,
            Id_Esquema,
            Monto,
            usuario,
            Estatus_Pagado,
        } = objeto;

            if(!Id_Esquema) return ['Falta el Esquema']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new ActualizaMovFacturaDto (
            Id_Mov_Fact,
            Id_Esquema,
            Monto,
            usuario,
            Estatus_Pagado,
        )]
    }
}

export class AgregarMovFacturaDto {

        private constructor(

        // public Id_Mov_Fact:string,
        public Id_ICPC:string,
        public Monto:string,
        public usuario:string,
        // public estatus:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovFacturaDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // Id_Mov_Fact,
            Id_ICPC,
            Monto,
            usuario,
            // estatus,
        } = objeto;

            if(!Id_ICPC) return ['Falta el Esquema']
            if(!Monto) return ['Falta el Monto']

        return [ undefined, new AgregarMovFacturaDto (
            // Id_Mov_Fact,
            Id_ICPC,
            Monto,
            usuario,
            // estatus,
        )]
    }
}
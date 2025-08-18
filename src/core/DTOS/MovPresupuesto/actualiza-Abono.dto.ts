
export class ActualizaAbonoDto {

        private constructor(

        public id_abono:string,
        public id_cuentaB:string,
        public monto:string,
        public usuario:string,
        public Observaciones:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ActualizaAbonoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            id_abono,
            id_cuentaB,
            monto,
            usuario,
            Observaciones
            // estatus,
        } = objeto;

            if(!id_cuentaB) return ['Falta el Esquema']
            if(!monto) return ['Falta el Monto']

        return [ undefined, new ActualizaAbonoDto (
            id_abono,
            id_cuentaB,
            monto,
            usuario,
            Observaciones
            // estatus,
        )]
    }
}
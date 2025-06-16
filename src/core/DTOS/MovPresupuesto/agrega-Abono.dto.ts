
export class AgregarAbonoDto {

        private constructor(

        // public id_abono:string,
        public id_cuentaB:string,
        public monto:string,
        public usuario:string,
        // public estatus:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarAbonoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            // id_abono,
            id_cuentaB,
            monto,
            usuario,
            // estatus,
        } = objeto;

            if(!id_cuentaB) return ['Falta el Esquema']
            if(!monto) return ['Falta el Monto']

        return [ undefined, new AgregarAbonoDto (
            // id_abono,
            id_cuentaB,
            monto,
            usuario,
            // estatus,
        )]
    }
}
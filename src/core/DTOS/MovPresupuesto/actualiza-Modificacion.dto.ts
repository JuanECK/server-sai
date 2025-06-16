
export class ModificacionPresupuestoDto {

        private constructor(

        public monto:string,
        public tipo:string,
        public observaciones:string,
        public usuario:string,
        // public estatus:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ModificacionPresupuestoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            monto,
            tipo,
            observaciones,
            usuario,
        } = objeto;

            if(!tipo) return ['Falta el Tipo de Modificacion']
            if(!monto) return ['Falta el Monto']

        return [ undefined, new ModificacionPresupuestoDto (
            monto,
            tipo,
            observaciones,
            usuario,
        )]
    }
}

export class AgregarMovRetiroCapitalDto {

        private constructor(

        public Id_CuentaB: string,
        public monto: string,
        public justificacion: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarMovRetiroCapitalDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_CuentaB,
            monto,
            justificacion,
            usuario,
        } = objeto;

            if(!Id_CuentaB) return ['Falta la cuenta de egreso']
            if(!monto) return ['Falta el Monto']
            if(!justificacion) return ['Falta una observacion']

        return [ undefined, new AgregarMovRetiroCapitalDto (
            Id_CuentaB,
            monto,
            justificacion,
            usuario,
        )]
    }
}
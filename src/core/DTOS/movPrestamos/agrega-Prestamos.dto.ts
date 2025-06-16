
export class AgregaPrestamosDto {

    private constructor(

        // public Id_Fondeo: string,
        public id_cuentaB: string,
        public monto: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregaPrestamosDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            // Id_Fondeo,
            id_cuentaB,
            monto,
            usuario,

        } = objeto;

            if(!id_cuentaB) return ['Falta Cuenta de destino']
            if(!monto) return ['Falta el Monto']

        return [ undefined, new AgregaPrestamosDto (
            // Id_Fondeo,
            id_cuentaB,
            monto,
            usuario,
        )]
    }

}
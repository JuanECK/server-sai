
export class CambiaEstatusPagadoDto {

    private constructor(

        public Id_Mov_Fact:string,
        public estatus_pagado:string,
        // public Id_CuentaB:string,
        public usuario:string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, CambiaEstatusPagadoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_Mov_Fact,
            estatus_pagado,
            // Id_CuentaB,
            usuario,
        } = objeto;

            if(!estatus_pagado) return ['Falta el Estatus']
            // if(!Id_CuentaB) return ['Falta la Cuenta de Retorno']

        return [ undefined, new CambiaEstatusPagadoDto (
            Id_Mov_Fact,
            estatus_pagado,
            // Id_CuentaB,
            usuario,
        )]
    }
}
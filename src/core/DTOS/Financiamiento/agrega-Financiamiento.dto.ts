
export class AgregarFinanciamientoDto {

    private constructor(
        // public Id_Mov_Fin: string,

        public Id_ICPC: string,
        public Monto: string,
        public Interes: string,
        public Comision: string,
        public Fecha_Vencimiento: string,
        public INE: string,
        public Contrato: string,
        public Observaciones: string,
        public usuario: string,

        // public estatus_pagado: string,
        // public estatus: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AgregarFinanciamientoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 
            Id_ICPC,
            Monto,
            Interes,
            Comision,
            Fecha_Vencimiento,
            INE,
            Contrato,
            Observaciones,
            usuario,
        } = objeto;

            if(!Id_ICPC) return ['Falta el Cliente']
            if(!Monto) return ['Falta el Monto']
            if(!Interes) return ['Falta el Interes']
            if(!Fecha_Vencimiento) return ['Falta la Fecha de vencimiento']

        return [ undefined, new AgregarFinanciamientoDto (
            Id_ICPC,
            Monto,
            Interes,
            Comision,
            Fecha_Vencimiento,
            INE,
            Contrato,
            Observaciones,
            usuario,
        )]
    }
}
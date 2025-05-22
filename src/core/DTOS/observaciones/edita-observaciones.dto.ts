import { regularExpsEmail } from "../../../config";


export class EditaObservacionesDto {

    private constructor(

        public Id_Mov_RN : string,
        public Tipo_Movimiento : string,
        public Id_CuentaB : string,
        public Monto : string,
        public Fecha_Ingreso : string,
        public Observaciones : string,
        public usuario : string,
        public estatus : string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, EditaObservacionesDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Id_Mov_RN,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Fecha_Ingreso,
            Observaciones,
            usuario,
            estatus,

        } = objeto;

            if(!Tipo_Movimiento) return ['Falta un Tipo de Movimiento']
            if(!Id_CuentaB) return ['Falta la Cuenta de ingreso']
            if(!Monto) return ['Falta el Monto']
            if(!Fecha_Ingreso) return ['Falta la Fecha de Ingreso']
            if(!usuario) return ['Falta Id Usuario']
            if(!estatus) return ['Falta Id Estatus']

        return [ undefined, new EditaObservacionesDto (
            Id_Mov_RN,
            Tipo_Movimiento,
            Id_CuentaB,
            Monto,
            Fecha_Ingreso,
            Observaciones,
            usuario,
            estatus,
        )]
    }

}
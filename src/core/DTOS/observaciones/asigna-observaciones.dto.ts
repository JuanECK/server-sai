import { regularExpsEmail } from "../../../config";


export class AsignaObservacionesDto {

    private constructor(

        public Id_Mov_RN: string,
        public Id_ICPC: string,
        public Tipo_Cliente: string,
        public usuario: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, AsignaObservacionesDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Id_Mov_RN,
            Id_ICPC,
            Tipo_Cliente,
            usuario,

        } = objeto;

        if(!Id_Mov_RN) return ['Falta el Id del Movimiento']
        if(!Id_ICPC) return ['Falta Id ICPC']
        if(!Tipo_Cliente) return ['Falta el Tipo de Cliente']
        if(!usuario) return ['Falta usuario']

        return [ undefined, new AsignaObservacionesDto (
            Id_Mov_RN,
            Id_ICPC,
            Tipo_Cliente,
            usuario,
        )]
    }
}
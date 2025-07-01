
export class ReporteIndividualDto {

    private constructor(

        public Id_ICPC: string,
        public fechaInicial: string,
        public fechaFin: string,
        public tipoReporte: string,
        public usuario: string,
        public Id_Modelo: string,
        public check1: string,
        public check2: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ReporteIndividualDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Id_ICPC,
            fechaInicial,
            fechaFin,
            tipoReporte,
            usuario,
            Id_Modelo,
            check1,
            check2,

        } = objeto;

            if(!Id_ICPC) return ['Faltan datos']
            if(!fechaInicial) return ['Faltan datos']
            if(!fechaFin) return ['Faltan datos']
            if(!tipoReporte) return ['Faltan datos']
            if(!usuario) return ['Faltan datos']
            if(!Id_Modelo) return ['Faltan datos']
            if(!check1) return ['Faltan datos']
            if(!check2) return ['Faltan datos']


        return [ undefined, new ReporteIndividualDto (
            Id_ICPC,
            fechaInicial,
            fechaFin,
            tipoReporte,
            usuario,
            Id_Modelo,
            check1,
            check2,
        )]
    }
}
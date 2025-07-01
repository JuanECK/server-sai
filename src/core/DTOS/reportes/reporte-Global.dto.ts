
export class ReporteGlobalDto {

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

    static crear(objeto: { [key: string]: any }): [string?, ReporteGlobalDto?] {
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


            // if(!Id_ICPC || Id_ICPC != 0) return ['Faltan datos1']
            if(!fechaInicial) return ['Faltan datos2']
            if(!fechaFin) return ['Faltan datos3']
            if(!tipoReporte) return ['Faltan datos4']
            if(!usuario) return ['Faltan datos5']
            if(!Id_Modelo) return ['Faltan datos6']
            // if(!check1) return ['Faltan datos7']
            // if(!check2) return ['Faltan datos8']


        return [ undefined, new ReporteGlobalDto (
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
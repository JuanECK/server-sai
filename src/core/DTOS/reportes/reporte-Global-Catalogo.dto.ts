
export class ReporteGlobalCatalogoDto {

    private constructor(

        public Id_ICPC: string,
        public fechaInicial: string,
        public fechaFin: string,
        public tipoReporte: string,
        public usuario: string,
        public Id_Modelo: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, ReporteGlobalCatalogoDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            Id_ICPC,
            fechaInicial,
            fechaFin,
            tipoReporte,
            usuario,
            Id_Modelo,

        } = objeto;

            if(!fechaInicial) return ['Faltan datos2']
            if(!fechaFin) return ['Faltan datos3']
            if(!tipoReporte) return ['Faltan datos4']
            if(!usuario) return ['Faltan datos5']
            if(!Id_Modelo) return ['Faltan datos6']



        return [ undefined, new ReporteGlobalCatalogoDto (
            Id_ICPC,
            fechaInicial,
            fechaFin,
            tipoReporte,
            usuario,
            Id_Modelo,

        )]
    }
}
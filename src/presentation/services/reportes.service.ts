
import { GeneraError } from "../../core";
import { ReporteGlobalCatalogoDto } from "../../core/DTOS/reportes/reporte-Global-Catalogo.dto";
import { ReporteGlobalDto } from "../../core/DTOS/reportes/reporte-Global.dto";
import { ReporteIndividualDto } from "../../core/DTOS/reportes/reporte-individual.dto";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
// import { AgregaReportesDto } from "../../core/DTOS/movReportes/agrega-Reportes.dto";
// import { EditaReportesDto } from "../../core/DTOS/movReportes/edita-Reportes.dto";
// import { AsignaReportesDto } from "../../core/DTOS/movReportes/asigna-Reportes.dto";


export class ReportesServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Reportes_Bancaria'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getCargaDataInicioIndividual() {
        try {
 
            const array:Array<any>[] = []
            const Inversion = 'sp_carga_ModelosNegocio_reporteIndividual'
            const Propiedad = 'sp_carga_propiedad'
            const listaInversion = await db.query(Inversion)
            const listaPropiedad = await db.query(Propiedad)

            array.push(listaInversion[0], listaPropiedad[0])

            // const array:Array<any>[] = []
            // const reporte_c1 = 'sp_reporte_c1_ejemplo'
            // const reporte_c2 = 'sp_reporte_c2_ejemplo'
            // const reporte_resumen = 'sp_reporte_resumen_ejemplo'
            // const listaReporte_c1 = await db.query(reporte_c1)
            // const listaReporte_c2 = await db.query(reporte_c2)
            // const listaReporte_resumen = await db.query(reporte_resumen)

            // array.push(listaReporte_c1[0],listaReporte_c2[0],listaReporte_resumen[0])
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getCargaDataInicioGlobal() {
        try {
 
            const array:Array<any>[] = []
            const Inversion = 'sp_carga_ModelosNegocio_reporteGlobal'
            const listaInversion = await db.query(Inversion)

            array.push(listaInversion[0])
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getNombreInv( nombre:string) {
        try {

            const sql = 'sp_carga_nombre_Inversionista :parametro '
            const lista = await db.query(sql, { replacements:{ parametro:nombre } })
            console.log(lista)
            
            return lista

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

        // public async prestamo( Id_Fondeo:string ) {
        //     try {
    
                
        //         const sql = 'sp_cambia_pagado_prestamoInterno :Id_Mov_RN, :pagado '
                
        //         const registro = await db.query( sql, { replacements:{ Id_Mov_RN:Id_Fondeo, pagado:1 } } )
                
        //         const response = JSON.parse(JSON.stringify(registro[0][0]))
                
        //         console.log( {response:response} )
        //         if (response.Resultado != 'ok') {
        //             throw GeneraError.servidorInterno('Error interno del servidor');
        //         }
    
        //         return { mensaje: 'Pago exitoso' }
    
        //     } catch (error) {
    
        //         console.log(error);
        //         throw GeneraError.servidorInterno(`${error}`)
        //     }
        // }

    public async getReporteIndividual( reporteIndividualDto:ReporteIndividualDto ) {
        try {

            // console.log(reporteIndividualDto)

             const array:Array<any>[] = []

            const { fechaInicial, fechaFin, tipoReporte, usuario, Id_ICPC, Id_Modelo, check1, check2 } = reporteIndividualDto
            const sqlE1 = 'sp_reporte_Encabezado1 :fechaInicial, :fechaFin, :tipoReporte, :usuario, :Id_ICPC, :Id_Modelo ';
            const sqlE2 = 'sp_reporte_Encabezado2_Individual :Id_ICPC, :fechaInicial, :fechaFin, :Id_Modelo ';
            const sqlRI = 'sp_reporte_individual :Id_ICPC, :Id_Modelo, :fechaInicial, :fechaFin, :check1, :check2 ';

            const Encabezado1 = await db.query( sqlE1, { replacements:{ 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                tipoReporte: tipoReporte, 
                usuario: usuario, 
                Id_ICPC: Id_ICPC, 
                Id_Modelo: Id_Modelo, 
             } } )

            const Encabezado2 = await db.query( sqlE2, { replacements:{ 
                Id_ICPC: Id_ICPC, 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                Id_Modelo: Id_Modelo, 
                check1: check1, 
                check2: check2,
             } } )

            const ReporteI = await db.query( sqlRI, { replacements:{ 
                Id_ICPC: Id_ICPC, 
                Id_Modelo: Id_Modelo, 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                check1: check1, 
                check2: check2,
             } } )
            
            // console.log(Encabezado1[0],Encabezado2[0],ReporteI[0])

            array.push(
                Encabezado1[0], 
                Encabezado2[0], 
                ReporteI[0]
            )

            // if( respuesta[0].Resultado == 'Sindatos'){
            //     respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
            // }else{
            //     respuestaFinal = busqueda
            // }
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.noEncontrado(`${error}`)
        }
    }
    public async getReporteGlobal( reporteGlobalDto:ReporteGlobalDto ) {
        try {

            
             const array:Array<any>[] = []

            const { fechaInicial, fechaFin, tipoReporte, usuario, Id_ICPC, Id_Modelo, check1, check2 } = reporteGlobalDto
            const sqlE1 = 'sp_reporte_Encabezado1 :fechaInicial, :fechaFin, :tipoReporte, :usuario, :Id_ICPC, :Id_Modelo ';
            const sqlE2 = 'sp_reporte_Encabezado2_Global :fechaInicial, :fechaFin, :Id_Modelo, :check1, :check2';
            const sqlRG = 'sp_reporte_Global :Id_Modelo, :fechaInicial, :fechaFin, :check1, :check2 ';

            const Encabezado1 = await db.query( sqlE1, { replacements:{ 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                tipoReporte: tipoReporte, 
                usuario: usuario, 
                Id_ICPC: Id_ICPC, 
                Id_Modelo: Id_Modelo, 
             } } )

            const Encabezado2 = await db.query( sqlE2, { replacements:{ 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                Id_Modelo: Id_Modelo, 
                check1: check1, 
                check2: check2,
             } } )

            const ReporteG = await db.query( sqlRG, { replacements:{ 
                Id_Modelo: Id_Modelo, 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                check1: check1, 
                check2: check2,
             } } )
            
            // console.log(Encabezado1[0],Encabezado2[0],ReporteG[0])

            array.push(
                Encabezado1[0], 
                Encabezado2[0], 
                ReporteG[0]
            )

            // if( respuesta[0].Resultado == 'Sindatos'){
            //     respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
            // }else{
            //     respuestaFinal = busqueda
            // }
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.noEncontrado(`${error}`)
        }
    }
    public async getReporteGlobalCatalogo( reporteGlobalCatalogoDto:ReporteGlobalCatalogoDto ) {
        try {

            // console.log(reporteIndividualDto)

             const array:Array<any>[] = []

            const { fechaInicial, fechaFin, tipoReporte, usuario, Id_ICPC, Id_Modelo } = reporteGlobalCatalogoDto
            const sqlE1 = 'sp_reporte_Encabezado1 :fechaInicial, :fechaFin, :tipoReporte, :usuario, :Id_ICPC, :Id_Modelo ';
            const sqlRGC = 'sp_reporte_catalogoInversionista';

            const Encabezado1 = await db.query( sqlE1, { replacements:{ 
                fechaInicial: fechaInicial, 
                fechaFin: fechaFin, 
                tipoReporte: tipoReporte, 
                usuario: usuario, 
                Id_ICPC: Id_ICPC, 
                Id_Modelo: Id_Modelo, 
             } } )

            const ReporteGC = await db.query( sqlRGC )
            
            // console.log(Encabezado1[0],ReporteGC[0])

            array.push(
                Encabezado1[0], 
                ReporteGC[0]
            )

            // if( respuesta[0].Resultado == 'Sindatos'){
            //     respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
            // }else{
            //     respuestaFinal = busqueda
            // }
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.noEncontrado(`${error}`)
        }
    }

    // public async cargaReportesId( id:string ) {
    //     try {

            
    //         const sql = 'sp_carga_prestamoInterno_seleccionado :Id_Fondeo'
    //         const busqueda = await db.query( sql, { replacements:{ Id_Fondeo:id } } )
    //         // console.log(busqueda)

    //         const data  = JSON.parse(JSON.stringify(busqueda[0]))

    //         return data

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    // public async setEliminarReportes( valores:any ) {
    //     try {

    //         console.log( {'ver valores':valores} )

    //         const { Id, usuario, estatus} = valores

    //         const sql = 'sp_desactiva_prestamoInterno :Id_Fondeo, :usuario, :estatus '

    //         const registro = await db.query( sql, { replacements:{ Id_Fondeo:Id, usuario:usuario, estatus:estatus} } )

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {
    //             throw GeneraError.servidorInterno('Error interno del servidor');
    //         }

    //         return { mensaje: 'Registro Eliminado' }

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    // public async setAsignaMovimientoCliente( asignaReportesDto:AsignaReportesDto ) {
    //     try {


    //         let respuestaFinal
    //         const { 
    //             Id_Mov_RN, Id_ICPC, Tipo_Cliente, usuario,
    //          } = asignaReportesDto

    //         const sql = 'sp_asigna_mov_NoReconocido :Id_Mov_RN, :Id_ICPC, :Tipo_Cliente, :usuario'

    //         const registro = await db.query( sql, { replacements:{ 
    //             Id_Mov_RN: Id_Mov_RN,
    //             Id_ICPC: Id_ICPC,
    //             Tipo_Cliente: Tipo_Cliente,
    //             usuario: usuario,
    //         } } )

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {

    //              respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
    //         }else{
    //             respuestaFinal = { mensaje:'Asignación exitosa', status:'ok' }
    //         }

    //         return respuestaFinal

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`Ocurrio un error inesperado`)
    //     }
    // }


    // public async setActualizaReportes( editaReportesDto: EditaReportesDto) {

    //     try {

    //         console.log({Datos:editaReportesDto})

    //         const {    Id_Fondeo, id_cuentaB, monto, usuario,
    //          } = editaReportesDto

    //         const sql =  'sp_actualiza_prestamoInterno :Id_Fondeo, :id_cuentaB, :monto, :usuario '

    //         const registro = await db.query(sql, {
    //         replacements: {
    //                 Id_Fondeo: Id_Fondeo,
    //                 id_cuentaB: id_cuentaB,
    //                 monto: monto,
    //                 usuario: usuario,
    //             }
    //         })

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {
                  
    //             throw GeneraError.servidorInterno('Error interno del servidor');
    //         }

    //         return { mensaje: 'Edición exitosa' }

    //     } catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }


    // public async agregaReportes( agregaReportesDto: AgregaReportesDto) {
    //     try {

    //         console.log({Datos:agregaReportesDto})

    //         const {  id_cuentaB, monto, usuario,
    //          } = agregaReportesDto

    //         const sql =  'sp_inserta_prestamoInterno :id_cuentaB, :monto, :usuario '
             
    //         const registro = await db.query(sql, {
    //             replacements: {
    //                 id_cuentaB: id_cuentaB,
    //                 monto: monto,
    //                 usuario: usuario,
    //             }
    //         })

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {
                  
    //             throw GeneraError.servidorInterno('Error interno del servidor');
    //         }

    //         return { mensaje: 'Captura exitosa' }


    //     } catch (error) {

    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)

    //     }


    // }

    formatoDigitoBancarioPeticion( digito:string ){
        return digito.replace(/\D/g, "");
    }

    formatoSalfoPeticion( saldo:string ){
        return saldo.replace(/,/g, '');
      }
}
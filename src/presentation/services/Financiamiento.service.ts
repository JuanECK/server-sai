import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { response } from "express";
import { ActualizaFinanciamientoDto } from "../../core/DTOS/Financiamiento/actualiza-Financiamientodto";
import { AgregarFinanciamientoDto } from "../../core/DTOS/Financiamiento/agrega-Financiamiento.dto";



export class FinanciamientoServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    // public async getEstado() {
    //     try {

    //         const sql = 'exec sp_carga_Estado';
    //         const estado = await db.query(sql)

    //         return estado;

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)

    //     }
    // }

    // public async getMunicipio(estado: string) {
    //     try {

    //         const sql = 'exec sp_carga_Municipio :id_estado'
    //         const municipio = await db.query(sql, { replacements: { id_estado: estado } })
    //         return municipio;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }
    // public async getReferidoMovInvercion() {
    //     try {

    //         const sql = 'sp_carga_recomendado_MovInvercion'
    //         const MovInvercion = await db.query(sql)
    //         return MovInvercion;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }
    // public async getReferidoBRK() {
    //     try {

    //         const sql = 'sp_carga_recomendado_brk'
    //         const BRK = await db.query(sql)
    //         return BRK;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    public async BusquedaAll() {
        try {

            
            const sql = 'sp_carga_conceptoInversion_Ingreso'
            const listaAll = await db.query(sql)
            
            return listaAll
            
        } catch (error) {
            
            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getDataInicio() {
        try {

            const cliente_financiamiento = 'sp_carga_cliente_financiamiento'

            const listaClienteFinanciamiento = await db.query(cliente_financiamiento)

            return listaClienteFinanciamiento

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }


            console.log(criterio)
            const sql = 'sp_busqueda_movProvedores :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

            if( respuesta.length === 0){
                throw ('No se Encontraron Coincidencias')
            }
            
            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_Mov_Financiamiento'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaFinanciamientoId( id:string ) {
        try {
        console.log({id:id})
            const sql = 'sp_carga_movFinanciamiento_seleccionado :Id_Mov_Fin'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Fin:id } } )
            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

        public async prestamo( Id:string ) {
            try {

                const sql = 'sp_cambia_pagado_movFinanciamiento :Id_Mov_Fin, :pagado '
                
                const registro = await db.query( sql, { replacements:{ Id_Mov_Fin:Id, pagado:1 } } )
                
                const response = JSON.parse(JSON.stringify(registro[0][0]))
                
                console.log( {response:response} )
                if (response.Resultado != 'ok') {
                    throw GeneraError.servidorInterno('Error interno del servidor');
                }

                return { mensaje: 'El pago se ha registrado' }

            } catch (error) {

                console.log(error);
                throw GeneraError.servidorInterno(`${error}`)
            }
        }

    public async setEliminarRegistro( valores:any ) {
        try {

            console.log(valores)

            const { Id, estatus, usuario } = valores

            const sql = 'sp_desactiva_movFinanciamiento :Id_Mov_Fin, :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Fin:Id, usuario:usuario, estatus:estatus} } )

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }
       
            return { mensaje: 'Registro eliminado' }

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }


    public async setActualizaMovInvercion(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', actualizaFinanciamientoDto: ActualizaFinanciamientoDto) {

        try {

            let fileNames
            let Arr = {fileName:'', fileName2:''}
            const { NameIne, NameContrato, eliminadoIne, eliminadoContrato } = comprobantesNames
            // console.log(actualizaFinanciamientoDto.INE)
            // console.log(actualizaFinanciamientoDto.Contrato)
            if(NameIne != actualizaFinanciamientoDto.INE ||  NameContrato != actualizaFinanciamientoDto.Contrato ){

                fileNames = await this.fileUploadService.getNameFileForma2( files )

                if( eliminadoIne != '' ){
                    Arr.fileName= eliminadoIne
                }else{

                    if(files[0].name != '0SAF0_SAF0.pdf' ){
                        Arr.fileName= actualizaFinanciamientoDto.INE
                        // console.log(actualizaFinanciamientoDto.INE)
                    }else if( NameIne != actualizaFinanciamientoDto.INE ){
                        // console.log('borra INE')
                        Arr.fileName= NameIne
                    }
                }

                if( eliminadoContrato != '' ){
                    Arr.fileName= eliminadoContrato
                }else{

                    if(files[1].name != '0SAF0_SAF0.pdf' ){
                        Arr.fileName2= actualizaFinanciamientoDto.Contrato
                        // console.log(actualizaFinanciamientoDto.Contrato)
                    }else if( NameContrato != actualizaFinanciamientoDto.Contrato ){
                        // console.log('borra Contrato')
                        Arr.fileName= NameContrato
                        
                    }
                }
                
                // console.log({Nombres:fileNames})
                if(fileNames[0].fileName != ''){
                    actualizaFinanciamientoDto.INE = fileNames[0].fileName
                    // console.log('entre Ine 1')
                }else{
                    // console.log('entre Ine 2')
                    actualizaFinanciamientoDto.INE = actualizaFinanciamientoDto.INE
  
                }

                if(fileNames[1].fileName != ''){
                    // console.log('entre contrato 1')
                    actualizaFinanciamientoDto.Contrato = fileNames[1].fileName
                }else{
                    // console.log('entre contrato 2')
                    actualizaFinanciamientoDto.Contrato = actualizaFinanciamientoDto.Contrato

                }
                    
            }


            // console.log({agregarMovInvercionDto:actualizaFinanciamientoDto})
        
             const {  Id_Mov_Fin, Id_ICPC, Monto, Interes, Comision, Fecha_Vencimiento, INE, Contrato, Observaciones, usuario, estatus_pagado, estatus,
            } = actualizaFinanciamientoDto

            const sql = 'sp_actualiza_movFinanciamiento :Id_Mov_Fin,:Id_ICPC,:Monto,:Interes,:Comision,:Fecha_Vencimiento,:INE,:Contrato,:Observaciones,:usuario,:estatus_pagado,:estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Fin:Id_Mov_Fin,
                    Id_ICPC:Id_ICPC,
                    Monto:Monto,
                    Interes:Interes,
                    Comision:Comision,
                    Fecha_Vencimiento:Fecha_Vencimiento,
                    INE:INE,
                    Contrato:Contrato,
                    Observaciones:Observaciones,
                    usuario:usuario,
                    estatus_pagado:estatus_pagado,
                    estatus:estatus,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            if(Arr.fileName != '' || Arr.fileName2 != ''){
                // console.log({Arr:Arr})
                await this.fileUploadService.deleteFile(Arr, folder)
            }

        
            const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombreMetodo2(files, folder, fileNames)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')

            return { mensaje: 'Edición exitosa' }

        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }



    public async AgregaFinanciamiento(files: UploadedFile[], comFiles:any, folder: string = 'uploads', agregarFinanciamientoDto: AgregarFinanciamientoDto) {


        try {

            let fileNames

            if(comFiles){
                console.log('hay comprobantes :)')
                fileNames = await this.fileUploadService.getNameFileForma2( files )
                console.log({Nombres:fileNames})
                if(fileNames[0]){
                    agregarFinanciamientoDto.INE = fileNames[0].fileName
                }
                if(fileNames[1]){
                agregarFinanciamientoDto.Contrato = fileNames[1].fileName
                }
                    
                }
                
            console.log({Datos:agregarFinanciamientoDto})

             const {   Id_ICPC, Monto, Interes, Comision, Fecha_Vencimiento, INE, Contrato, Observaciones, usuario,
            } = agregarFinanciamientoDto

            const sql = 'sp_inserta_movFinanciamiento :Id_ICPC,:Monto,:Interes,:Comision,:Fecha_Vencimiento,:INE,:Contrato,:Observaciones,:usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC: Id_ICPC,
                    Monto: Monto,
                    Interes: Interes,
                    Comision: Comision,
                    Fecha_Vencimiento: Fecha_Vencimiento,
                    INE: INE,
                    Contrato: Contrato,
                    Observaciones: Observaciones,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombreMetodo2(files, folder, fileNames)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')

            // const uploadDoc = await this.fileUploadService.ActualizaDocumentMetodo2(files, folder)
            // if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')

            // // console.log(agregarMovInvercionDto)
            return { mensaje: 'El movimiento se ha almacenado' }
            // throw GeneraError.servidorInterno(`error`)

        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

}
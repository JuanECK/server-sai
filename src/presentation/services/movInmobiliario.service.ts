import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { response } from "express";
import { AgregarMovProveedorDto } from "../../core/DTOS/MovProveedor/agrega-MovProveedor.dto";
import { ActualizaMovProveedorDto } from "../../core/DTOS/MovProveedor/actualiza-MovProveedor.dto";
import { AgregarMovInmobiliarioDto } from "../../core/DTOS/MovInmobiliario/agrega-MovInmobiliario.dto";
import { ActualizaMovInmobiliarioDto } from "../../core/DTOS/MovInmobiliario/actualiza-MovInmobiliario.dto";


export class MovInmobiliarioServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

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

            const array:Array<any>[] = []
            
            const propiedad = 'sp_carga_propiedad'
            // const concepto = 'sp_carga_concepto_inmobi :tipoMovimiento'
            const cuentas = 'sp_carga_cuentas_inmobi'
            const listaproveedor = await db.query(propiedad)
            // const listaconcepto = await db.query(concepto, { replacements:{tipoMovimiento:'Ingreso'}})
            const listacuentas = await db.query(cuentas)

            array.push(listaproveedor[0],listacuentas[0])
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getConcepto( concepto:string ) {
        try {

            const conceptoSQL = 'sp_carga_concepto_inmobi :tipoMovimiento'

            const listaconcepto = await db.query(conceptoSQL, { replacements:{tipoMovimiento:concepto}})
          
            return listaconcepto

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

            let respData:any
            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }


            console.log(criterio)
            const sql = 'sp_busqueda_movInmobiliario :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))
            console.log(respuesta)

            if( respuesta[0].Resultado == 'Sindatos'){

                respData = { status:'error', mensaje:'No se Encontraron Coincidencias' }
                // throw ('No se Encontraron Coincidencias')
            }else{

                respData = { status:200, data: respuesta }
            }
            
            return respData

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_movInmobiliario'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovInmobiliarioId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_movInmobiliario_seleccionado :Id_Mov_Inmo '
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Inmo:id } } )
            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarRegistro( valores:any ) {
        try {

            console.log(valores)

            const { Id, estatus, usuario } = valores

            const sql = 'sp_desactiva_movInmobiliaro :Id_Mov_Inmo, :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Inmo:Id, usuario:usuario, estatus:estatus} } )

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }
       
            return { mensaje: 'Registro Eliminado' }

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }


    public async setActualizaMovInmobiliario(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', actualizaMovInmobiliarioDto: ActualizaMovInmobiliarioDto) {

        try {

            let respData:any
            let accion = { elimina:false, actualiza:false }
            let fileNames
            let Arr = {fileName:''}
            const { NameComprobante, eliminadoComprobante } = comprobantesNames

            
            
            if( NameComprobante == '' &&  eliminadoComprobante == '' && files[0].name != '0SAF0_SAF0.pdf'){
                    fileNames = await this.fileUploadService.getNameFileForma2( files )
                    actualizaMovInmobiliarioDto.Comprobante = fileNames[0].fileName
                    accion.actualiza = true;
                }
                
                if( NameComprobante == '' &&  eliminadoComprobante != '' && files[0].name == '0SAF0_SAF0.pdf'){
                    console.log('Eliminaste el comporbante')
                    Arr.fileName= eliminadoComprobante
                    accion.elimina = true
                }
                
                if( NameComprobante == '' &&  eliminadoComprobante != '' && files[0].name != '0SAF0_SAF0.pdf'){
                    console.log('actualizaste el comporobante')
                    fileNames = await this.fileUploadService.getNameFileForma2( files )
                    actualizaMovInmobiliarioDto.Comprobante = fileNames[0].fileName

                    Arr.fileName= eliminadoComprobante;
                    accion.elimina = true;
                    accion.actualiza = true;

                }



            console.log({agregarMovInvercionDto:actualizaMovInmobiliarioDto})
        
             const {  Id_Mov_Inmo, Id_ICPC, Id_CuentaB, Tipo_Movimiento, Monto, Concepto, Observaciones, Comprobante, usuario, estatus
            } = actualizaMovInmobiliarioDto

            const sql = 'sp_actualiza_movInmobiliario :Id_Mov_Inmo, :Id_ICPC, :Id_CuentaB, :Tipo_Movimiento, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Inmo: Id_Mov_Inmo,
                    Id_ICPC: Id_ICPC,
                    Id_CuentaB: Id_CuentaB,
                    Tipo_Movimiento: Tipo_Movimiento,
                    Monto: Monto,
                    Concepto: Concepto,
                    Observaciones: Observaciones,
                    Comprobante: Comprobante,
                    usuario: usuario,
                    estatus: estatus,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {
                if( response.Respuesta == 'no' ){
                    return respData = { status:'error', mensaje:'si no hay saldo suficiente' }
                }
                respData = { status:'error', mensaje:'Error interno del servidor' }
                // throw GeneraError.servidorInterno('Error interno del servidor');
            }else{
                respData = { status:200, mensaje:'Edición exitosa' }
            }

            if(accion.actualiza){
               const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombreMetodo2(files, folder, fileNames)
               if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')
           }

             if(accion.elimina){
                await this.fileUploadService.deleteFile(Arr, folder)
            }

             if(accion.elimina && accion.actualiza){
                await this.fileUploadService.deleteFile(Arr, folder)
                const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombreMetodo2(files, folder, fileNames)
                if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')
            }

            return respData


        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }



    public async agregaMovInmobiliario(files: UploadedFile[], comFiles:Boolean, folder: string = 'uploads', agregarMovInmobiliarioDto: AgregarMovInmobiliarioDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            // console.log({Files:comFiles})
            let respData:any

            let fileNames
            
            if(comFiles){

                fileNames = await this.fileUploadService.getNameFileForma2( files )
                console.log({Nombres:fileNames})
                if(fileNames[0]){
                    agregarMovInmobiliarioDto.Comprobante = fileNames[0].fileName
                }

                // console.log('hay comprobante :)')
                // const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                // if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')
                    
                // agregarMovInmobiliarioDto.Comprobante = uploadDoc[0].fileName
                    
            }
                
            console.log({Datos:agregarMovInmobiliarioDto})

             const {  Id_ICPC, Id_CuentaB, Tipo_Movimiento, Monto, Concepto, Observaciones, Comprobante, usuario
            } = agregarMovInmobiliarioDto

            const sql = 'sp_inserta_movInmobiliario :Id_ICPC, :Id_CuentaB, :Tipo_Movimiento, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC: Id_ICPC,
                    Id_CuentaB: Id_CuentaB,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Monto: Monto,
                    Concepto: Concepto,
                    Observaciones: Observaciones,
                    Comprobante: Comprobante,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {

                if ( response.Respuesta == 'no'){

                   return respData = { status:'error', mensaje:'No hay suficiente saldo en la cuenta para la operación' }

                }

                throw GeneraError.servidorInterno('Error interno del servidor');

                // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
 
                    // this.fileUploadService.deleteFile(Arr, folder)
                  
            }

            if(comFiles){
            const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombreMetodo2(files, folder, fileNames)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')
            }
            // console.log(agregarMovInvercionDto)
            return { status:200, mensaje: 'El movimiento se ha almacenado' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

}
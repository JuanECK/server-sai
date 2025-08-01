import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { response } from "express";
import { AgregarMovOficinaDto } from "../../core/DTOS/MovOficina/agrega-MovOficina.dto";
import { ActualizaMovOficinaDto } from "../../core/DTOS/MovOficina/actualiza-MovOficina.dto";


export class MovOficinaServicio {
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
            
            const concepto = 'sp_carga_concepto_oficina'
            const cuentas = 'sp_carga_cuentas_presupuesto_list'
            // const cuentas = 'sp_carga_cuenta_oficina'
            const listaconcepto = await db.query(concepto)
            const listacuentas = await db.query(cuentas)

            array.push(listaconcepto[0],listacuentas[0])
            
            return array

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
            const sql = 'sp_busqueda_movOficina :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda))

            if( respuesta[0].Resultado == 'Sindatos'){
                console.log(1)
                respData = { status:'error', mensaje:'No se Encontraron Coincidencias' }
                // throw ('No se Encontraron Coincidencias')
            }else{
                console.log(2)
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

            const sql = 'sp_historico_movOficina'
            const listaAll = await db.query(sql)
            console.log({historico:listaAll})
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovOficinaId( id:string ) {
        try {
console.log({id:id})
            const sql = 'sp_carga_movOficina_seleccionado :Id_Mov_Ofi'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Ofi:id } } )
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

            const sql = 'sp_desactiva_movOficina :Id_Mov_Ofi , :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Ofi:Id, usuario:usuario, estatus:estatus} } )

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


    public async setActualizaMovInvercion(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', actualizaMovOficinaDto: ActualizaMovOficinaDto) {

        try {

            console.log({Comprobante:actualizaMovOficinaDto.Comprobante})
            if( actualizaMovOficinaDto.Comprobante == '' ){
                const { NameComprobante } = comprobantesNames
                let Arr = {fileName:''}
                Arr.fileName = NameComprobante

                if( files[0] == undefined ){
                    console.log('borra - ' , comprobantesNames)
                    await this.fileUploadService.deleteFile(Arr, folder)

                }else{
                    
                    if(files[0] != undefined){
                        console.log('actualize - ' , comprobantesNames)
                        
            
                        await this.fileUploadService.deleteFile(Arr, folder)
                        
                        const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                        if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')
            
                        console.log({uploadDoc:uploadDoc})

                            actualizaMovOficinaDto.Comprobante = uploadDoc[0].fileName

                    }
        
                }
            
            }

            console.log({agregarMovInvercionDto:actualizaMovOficinaDto})
        
             const { Id_Mov_Ofi, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario, estatus
            } = actualizaMovOficinaDto

            const sql = 'sp_actualiza_movOficina :Id_Mov_Ofi, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Ofi:Id_Mov_Ofi,
                    Id_CuentaB: Id_CuentaB,
                    Monto: Monto,
                    Concepto: Concepto,
                    Observaciones: Observaciones,
                    Comprobante: Comprobante,
                    usuario: usuario,
                    estatus:estatus,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Edición exitosa' }

        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }



    public async AgregaMovOficina(files: UploadedFile[], comFiles:Boolean, folder: string = 'uploads', agregarMovOficinaDto: AgregarMovOficinaDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            // console.log({Files:comFiles})
            
            if(comFiles){
                console.log('hay comprobante :)')
                const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')
                    
                    agregarMovOficinaDto.Comprobante = uploadDoc[0].fileName
                    
                }
                
            console.log({Datos:agregarMovOficinaDto})
             const {  Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario
            } = agregarMovOficinaDto

            const sql = 'sp_inserta_movOficina :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_CuentaB: Id_CuentaB,
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

                // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
 
                    // this.fileUploadService.deleteFile(Arr, folder)
                  
                throw GeneraError.servidorInterno('Error interno del servidor');

            }


            // console.log(agregarMovInvercionDto)
            return { mensaje: 'El movimiento se ha almacenado' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

}
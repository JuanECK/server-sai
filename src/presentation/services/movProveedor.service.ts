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


export class MovProveedorServicio {
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
            
            const proveedor = 'sp_carga_proveedor_list'
            const concepto = 'sp_carga_concepto_proveedor_list'
            const cuentas = 'sp_carga_cuentas_proveedor_list'
            const listaproveedor = await db.query(proveedor)
            const listaconcepto = await db.query(concepto)
            const listacuentas = await db.query(cuentas)

            array.push(listaproveedor[0],listaconcepto[0],listacuentas[0])
            
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
            const sql = 'sp_busqueda_movProvedores :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

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

            const sql = 'sp_historico_movProveedores'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovProveedorId( id:string ) {
        try {
console.log({id:id})
            const sql = 'sp_carga_movProvedores_seleccionado :Id_Mov_Prov'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Prov:id } } )
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

            const sql = 'sp_desactiva_movProveedores :Id_Mov_Prov , :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Prov:Id, usuario:usuario, estatus:estatus} } )

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


    public async setActualizaMovInvercion(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', actualizaMovProveedorDto: ActualizaMovProveedorDto) {

        try {

            console.log({Comprobante:actualizaMovProveedorDto.Comprobante})
            if( actualizaMovProveedorDto.Comprobante == '' ){
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

                            actualizaMovProveedorDto.Comprobante = uploadDoc[0].fileName

                    }
        
                }
            
            }

            console.log({agregarMovInvercionDto:actualizaMovProveedorDto})
        
             const { Id_Mov_Prov, Id_ICPC, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario, estatus
            } = actualizaMovProveedorDto

            const sql = 'sp_actualiza_movProveedores :Id_Mov_Prov, :Id_ICPC, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Prov:Id_Mov_Prov,
                    Id_ICPC: Id_ICPC,
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



    public async AgregaMovProveedor(files: UploadedFile[], comFiles:Boolean, folder: string = 'uploads', agregarMovProveedorDto: AgregarMovProveedorDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            // console.log({Files:comFiles})
            
            if(comFiles){
                console.log('hay comprobante :)')
                const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')
                    
                    agregarMovProveedorDto.Comprobante = uploadDoc[0].fileName
                    
                }
                
            console.log({Datos:agregarMovProveedorDto})
             const {  Id_ICPC, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario
            } = agregarMovProveedorDto

            const sql = 'sp_inserta_movProveedores :Id_ICPC, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC: Id_ICPC,
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
            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

}
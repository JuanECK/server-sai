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
            const concepto = 'sp_carga_concepto_inmobi'
            const cuentas = 'sp_carga_cuentas_inmobi'
            const listaproveedor = await db.query(propiedad)
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

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }


            console.log(criterio)
            const sql = 'sp_busqueda_movInmobiliario :parametro'
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

            console.log({Comprobante:actualizaMovInmobiliarioDto.Comprobante})
            if( actualizaMovInmobiliarioDto.Comprobante == '' ){
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

                            actualizaMovInmobiliarioDto.Comprobante = uploadDoc[0].fileName

                    }
        
                }
            
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

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Edición exitosa' }

            throw GeneraError.servidorInterno(`error`)

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
            
            if(comFiles){
                console.log('hay comprobante :)')
                const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')
                    
                    agregarMovInmobiliarioDto.Comprobante = uploadDoc[0].fileName
                    
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
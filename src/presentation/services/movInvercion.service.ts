import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { AgregarMovInvercionDto } from "../../core/DTOS/MovInvercion/agrega-MovInvercion.dto";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { ActualizaMovInvercionDto } from "../../core/DTOS/MovInvercion/actualiza-MovInvercion.dto";
import { response } from "express";


export class MovInvercionsServicio {
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
    public async getEgresoIngreso() {
        try {

            // interface ingresoEgreso {
            //     ingreso:[],
            //     egreso:[]
            // }
            const array:Array<any>[] = []
            
            const Ingreso = 'sp_carga_conceptoInversion_Ingreso'
            const Egreso = 'sp_carga_conceptoInversion_Egreso'
            const listaIngreso = await db.query(Ingreso)
            const listaEgreso = await db.query(Egreso)

            array.push(listaIngreso[0],listaEgreso[0])
            // array.push(ingresoEgreso.ingreso)
            // const lista: ingresoEgreso = {
            //     [ingreso]:listaIngreso
            // }
            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getCuentaBancaria() {
        try {
            
            const Ingreso = 'sp_carga_cuentas_list_Inversionista'
            const listaCuenta = await db.query(Ingreso)
            

            console.log(listaCuenta)
            
            return listaCuenta

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getNombreInv( criterio:string ) {
        try {

            console.log(criterio)

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }

            const sql = 'sp_carga_nombre_Inversionista :parametro'
            const lista = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(lista[0]))

            if( respuesta.length === 0){
                throw ('No se Encontraron Coincidencias')
            }
            console.log(respuesta)
            return respuesta

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
            const sql = 'sp_busqueda_movInversiones :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda))

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

            const sql = 'sp_historico_Mov_Inversionista'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovInvercionId( id:string ) {
        try {

            const sql = 'sp_carga_movInversion_seleccionado :Id_Mov_Inv'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Inv:id } } )
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

            const sql = 'sp_desactiva_movInversionista :Id_Mov_Inv, :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Inv:Id, usuario:usuario, estatus:estatus} } )

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

    // public async registraInversionista( registraInversionistaDto:RegistraInversionistaDto ) {
    //     try {

    //         console.log(registraInversionistaDto)
    //         const { usuario, Id_ICPC, BRK, Fecha_Nac, Beneficiario1, Fecha_Nac_Beneficiario1, Porcentaje_Beneficiario1, Beneficiario2, Fecha_Nac_Beneficiario2, Porcentaje_Beneficiario2, Beneficiario3, Fecha_Nac_Beneficiario3, Porcentaje_Beneficiario3, Beneficiario4, Fecha_Nac_Beneficiario4, Porcentaje_Beneficiario4, Beneficiario5, Fecha_Nac_Beneficiario5, Porcentaje_Beneficiario5, Recomendado, Fecha_Contrato, estatus } = registraInversionistaDto
    //         const sql = ' sp_agrega_portafolio_Inversionista :usuario, :Id_ICPC, :BRK, :Fecha_Nac, :Beneficiario1, :Fecha_Nac_Beneficiario1, :Porcentaje_Beneficiario1, :Beneficiario2, :Fecha_Nac_Beneficiario2, :Porcentaje_Beneficiario2, :Beneficiario3, :Fecha_Nac_Beneficiario3, :Porcentaje_Beneficiario3, :Beneficiario4, :Fecha_Nac_Beneficiario4, :Porcentaje_Beneficiario4, :Beneficiario5, :Fecha_Nac_Beneficiario5, :Porcentaje_Beneficiario5, :Recomendado, :Fecha_Contrato, :estatus'
    //         const registro = await db.query(sql, { replacements:{
    //             usuario: usuario,
    //             Id_ICPC: Id_ICPC,
    //             BRK: BRK,
    //             Fecha_Nac: Fecha_Nac,
    //             Beneficiario1: Beneficiario1,
    //             Fecha_Nac_Beneficiario1: Fecha_Nac_Beneficiario1,
    //             Porcentaje_Beneficiario1: Porcentaje_Beneficiario1,
    //             Beneficiario2: Beneficiario2,
    //             Fecha_Nac_Beneficiario2: Fecha_Nac_Beneficiario2,
    //             Porcentaje_Beneficiario2: Porcentaje_Beneficiario2,
    //             Beneficiario3: Beneficiario3,
    //             Fecha_Nac_Beneficiario3: Fecha_Nac_Beneficiario3,
    //             Porcentaje_Beneficiario3: Porcentaje_Beneficiario3,
    //             Beneficiario4: Beneficiario4,
    //             Fecha_Nac_Beneficiario4: Fecha_Nac_Beneficiario4,
    //             Porcentaje_Beneficiario4: Porcentaje_Beneficiario4,
    //             Beneficiario5: Beneficiario5,
    //             Fecha_Nac_Beneficiario5: Fecha_Nac_Beneficiario5,
    //             Porcentaje_Beneficiario5: Porcentaje_Beneficiario5,
    //             Recomendado: Recomendado,
    //             Fecha_Contrato: Fecha_Contrato,
    //             estatus: estatus,
    //         }})

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {
    //             throw GeneraError.servidorInterno('Error interno del servidor');
    //         }

    //         return { mensaje: 'Protafolio de Inversión creado exitosamente' }

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    public async setActualizaMovInvercion(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', actualizaMovInvercionDto: ActualizaMovInvercionDto) {

        try {

            if( actualizaMovInvercionDto.Comprobante == '' ){

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
        
        
                    // if( Arr.fileName != ''){
                        actualizaMovInvercionDto.Comprobante = uploadDoc[0].fileName
                    // }


                }
    
            }
            

            }

            console.log({agregarMovInvercionDto:actualizaMovInvercionDto})
        

            const { Id_Mov_Inv, Id_ICPC, Tipo_Movimiento, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario, estatus
            } = actualizaMovInvercionDto
            


            const sql = 'sp_actualiza_movInversionista :Id_Mov_Inv, :Id_ICPC, :Tipo_Movimiento, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Inv:Id_Mov_Inv,
                    Id_ICPC:Id_ICPC,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Id_CuentaB:Id_CuentaB,
                    Monto:Monto,
                    Concepto:Concepto,
                    Observaciones:Observaciones,
                    Comprobante:Comprobante,
                    usuario:usuario,
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
    public async setActualizaMovInvercionSimple( actualizaMovInvercionDto: ActualizaMovInvercionDto) {

        try {


            console.log({agregarMovInvercionDto:actualizaMovInvercionDto})

          const { Id_Mov_Inv, Id_ICPC, Tipo_Movimiento, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario, estatus
            } = actualizaMovInvercionDto

            const sql = 'sp_actualiza_movInversionista :Id_Mov_Inv, :Id_ICPC, :Tipo_Movimiento, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Inv:Id_Mov_Inv,
                    Id_ICPC:Id_ICPC,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Id_CuentaB:Id_CuentaB,
                    Monto:Monto,
                    Concepto:Concepto,
                    Observaciones:Observaciones,
                    Comprobante:Comprobante,
                    usuario:usuario,
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


    public async AgregaMovInvercion(files: UploadedFile[], folder: string = 'uploads', agregarMovInvercionDto: AgregarMovInvercionDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            
            const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')

            agregarMovInvercionDto.Comprobante = uploadDoc[0].fileName
            // agregarMovInvercionDto.INE = uploadDoc[1].fileName

            console.log({Datos:agregarMovInvercionDto})

             const { Id_ICPC, Tipo_Movimiento, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario
            } = agregarMovInvercionDto

            const sql = 'sp_inserta_movInversionista :Id_ICPC, :Tipo_Movimiento, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC:Id_ICPC,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Id_CuentaB:Id_CuentaB,
                    Monto:Monto,
                    Concepto:Concepto,
                    Observaciones:Observaciones,
                    Comprobante:Comprobante,
                    usuario:usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {

                const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
                // console.log({Arr:Arr, foler:folder})
                    this.fileUploadService.deleteFile(Arr, folder)
                  
                throw GeneraError.servidorInterno('Error interno del servidor');

            }


            // console.log(agregarMovInvercionDto)
            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
    public async AgregaMovInvercionSimple( agregarMovInvercionDto: AgregarMovInvercionDto ) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            let respuestaFinal;
            console.log({Datos:agregarMovInvercionDto})

            const { Id_ICPC, Tipo_Movimiento, Id_CuentaB, Monto, Concepto, Observaciones, Comprobante, usuario
            } = agregarMovInvercionDto

            const sql = 'sp_inserta_movInversionista :Id_ICPC, :Tipo_Movimiento, :Id_CuentaB, :Monto, :Concepto, :Observaciones, :Comprobante, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC:Id_ICPC,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Id_CuentaB:Id_CuentaB,
                    Monto:Monto,
                    Concepto:Concepto,
                    Observaciones:Observaciones,
                    Comprobante:Comprobante,
                    usuario:usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
             console.log(response)

            if (response.Respuesta != 'ok') {

                if( response.Respuesta == 'no' ){

                    return { error:'No hay saldo suficiente en la cuenta', status:'error' }
                }
                  
               return { error:'Error interno del servidor', status:'error' }

            }

            return { mensaje:'El movimiento se ha almacenado', status:200 }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
}
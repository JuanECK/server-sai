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
// import { AgregarMovEliminadosDto } from "../../core/DTOS/MovEliminados/agrega-MovEliminados.dto";
// import { ActualizaMovEliminadosDto } from "../../core/DTOS/MovEliminados/actualiza-MovEliminados.dto";
// import { CambiaEstatusPagadoDto } from "../../core/DTOS/MovEliminados/cambia-EstatusPagado.dto";


export class MovEliminadosServicio {
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
            const Esquema = 'sp_carga_Esquema_Eliminadoscion'
            const Eliminadoscion = 'sp_carga_cuentas_Eliminadoscion'
            const listaproveedor = await db.query(Esquema)
            const listaEliminadoscion = await db.query(Eliminadoscion)
            array.push(listaproveedor[0],listaEliminadoscion[0])
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

            console.log(criterio)

            let respuestaFinal

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }

            console.log(criterio)
            const sql = 'sp_busqueda_movEliminado :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )
            
            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))
            console.log(respuesta)

            if( respuesta[0].Resultado == 'Sindatos'){
                respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
            }else{
                respuestaFinal = busqueda
            }
            
            return respuestaFinal

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_movEliminado'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovEliminadosId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_movEliminadoscion_seleccionado :Id_Mov_Fact '
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Fact:id } } )

            console.log(busqueda)

            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async cargaEstatusPagadoId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_movEliminadoscion_pagar :Id_Mov_Fact '
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Fact:id } } )

            console.log(busqueda)

            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setRestauraRegistro( valores:any ) {
        try {

            console.log(valores)

            const { Id, Tabla, Estatus, usuario } = valores

            const sql = 'sp_restaura_movEliminado :Id_Mov, :Tabla, :Estatus, :usuario'

            const registro = await db.query( sql, { replacements:{ Id_Mov:Id, Tabla:Tabla, Estatus:Estatus, usuario:usuario } } )

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }
       
            return { mensaje: 'El movimiento se ha restaurado' }

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }


    // public async setActualizaMovEliminados( actualizaMovEliminadosDto: ActualizaMovEliminadosDto) {

    //     try {


    //         console.log({agregarMovInvercionDto:actualizaMovEliminadosDto})
        
    //          const {   Id_Mov_Fact, Id_ICPC, Monto, usuario, Estatus_Pagado,
    //         } = actualizaMovEliminadosDto

    //         const sql = 'sp_actualiza_movEliminadoscion  :Id_Mov_Fact, :Id_ICPC, :Monto, :usuario, :Estatus_Pagado'

    //         const registro = await db.query(sql, {
    //             replacements: {
    //                 Id_Mov_Fact: Id_Mov_Fact,
    //                 Id_ICPC: Id_ICPC,
    //                 Monto: Monto,
    //                 usuario: usuario,
    //                 Estatus_Pagado: Estatus_Pagado,
    //             }
    //         })

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))

    //         if (response.Respuesta != 'ok') {
    //             throw GeneraError.servidorInterno('Error interno del servidor');
    //         }

    //         return { mensaje: 'Modificación exitosa' }

    //         // throw GeneraError.servidorInterno(`error`)

    //     } catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }



    // public async agregaMovEliminados( agregarMovEliminadosDto: AgregarMovEliminadosDto) {
    //     // const validExtensions:string[] = ['pdf']

    //     // console.log({Archivos:files})

    //     try {
                
    //         console.log({Datos:agregarMovEliminadosDto})

    //          const {   Id_ICPC, Monto, usuario
    //         } = agregarMovEliminadosDto

    //         const sql = 'sp_inserta_movEliminadoscion :Id_ICPC,:Monto,:usuario'

    //         const registro = await db.query(sql, {
    //             replacements: {
    //                 Id_ICPC: Id_ICPC,
    //                 Monto: Monto,
    //                 usuario: usuario,
    //             }
    //         })

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))
    //         console.log(response)

    //         if (response.Respuesta != 'ok') {

    //             // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
 
    //                 // this.fileUploadService.deleteFile(Arr, folder)
                  
    //             throw GeneraError.servidorInterno('Error interno del servidor');

    //         }


    //         // console.log(agregarMovInvercionDto)
    //         return { mensaje: 'El movimiento se ha almacenado' }


    //     } catch (error) {

    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)

    //     }


    // }

    // public async cambiaEstatusPagado( cambiaEstatusPagadoDto: CambiaEstatusPagadoDto) {
    //     // const validExtensions:string[] = ['pdf']

    //     // console.log({Archivos:files})

    //     try {
                
    //         console.log({Datos:cambiaEstatusPagadoDto})

    //          const {    Id_Mov_Fact, estatus_pagado, Id_CuentaB, usuario
    //         } = cambiaEstatusPagadoDto

    //         const sql = 'sp_cambia_movEliminadoscion_pagado :Id_Mov_Fact, :estatus_pagado, :Id_CuentaB, :usuario'

    //         const registro = await db.query(sql, {
    //             replacements: {
    //                 Id_Mov_Fact: Id_Mov_Fact,
    //                 estatus_pagado: estatus_pagado,
    //                 Id_CuentaB: Id_CuentaB,
    //                 usuario: usuario,
    //             }
    //         })

    //         const response = JSON.parse(JSON.stringify(registro[0][0]))
    //         console.log(response)

    //         if (response.Respuesta != 'ok') {

    //             // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
 
    //                 // this.fileUploadService.deleteFile(Arr, folder)
                  
    //             throw GeneraError.servidorInterno('Error interno del servidor');

    //         }


    //         // console.log(agregarMovInvercionDto)
    //         return { mensaje: 'Modificación exitosa' }


    //     } catch (error) {

    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)

    //     }


    // }

}
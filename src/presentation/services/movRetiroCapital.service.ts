
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregaPrestamosDto } from "../../core/DTOS/movPrestamos/agrega-Prestamos.dto";
import { EditaPrestamosDto } from "../../core/DTOS/movPrestamos/edita-Prestamos.dto";
import { AsignaPrestamosDto } from "../../core/DTOS/movPrestamos/asigna-Prestamos.dto";
import { AgregarMovRetiroCapitalDto } from "../../core/DTOS/movRetiroCapital/agrega-MovRetiroCapital.dto";
import { ActualizaMovRetiroCapitalDto } from "../../core/DTOS/movRetiroCapital/actualiza-MovRetiroCapital.dto";


export class RetiroCapitalServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Prestamos_Bancaria'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getCargaDataInicio() {
        try {

            const sql = 'sp_saldo_cuentas_dash'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_movRetiroCapital'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

        public async prestamo( Id_Fondeo:string ) {
            try {
    
                
                const sql = 'sp_cambia_pagado_prestamoInterno :Id_Mov_RN, :pagado '
                
                const registro = await db.query( sql, { replacements:{ Id_Mov_RN:Id_Fondeo, pagado:1 } } )
                
                const response = JSON.parse(JSON.stringify(registro[0][0]))
                
                console.log( {response:response} )
                if (response.Resultado != 'ok') {
                    throw GeneraError.servidorInterno('Error interno del servidor');
                }
    
                return { mensaje: 'Pago exitoso' }
    
            } catch (error) {
    
                console.log(error);
                throw GeneraError.servidorInterno(`${error}`)
            }
        }

    // public async getBusqueda( criterio:string ) {
    //     try {

    //         console.log(criterio)

    //          let respuestaFinal

    //         if( criterio === '' ){
    //             throw ('Sin criterio de busqueda');
    //         }

    //         console.log(criterio)
    //         const sql = 'sp_busqueda_listado_clientes :parametro'
    //         const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )
            
    //         const respuesta = JSON.parse(JSON.stringify(busqueda[0]))
    //         console.log(respuesta)

    //         if( respuesta[0].Resultado == 'Sindatos'){
    //             respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
    //         }else{
    //             respuestaFinal = busqueda
    //         }
            
    //         return respuestaFinal

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.noEncontrado(`${error}`)
    //     }
    // }

    public async cargaPrestamosId( id:string ) {
        try {

            
            const sql = 'sp_carga_movRetiroCapital_seleccionado :Id_Mov_Retiro '
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Retiro:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

            console.log({criterio:criterio})

            let respData:any

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }

            // console.log(criterio)
            const sql = 'sp_busqueda_movRetiroCapital :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

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
            throw GeneraError.noEncontrado(`${error}`)
        }
    }

    public async setEliminar( valores:any ) {
        try {

            console.log( {'ver valores':valores} )

            const { Id, usuario, estatus} = valores

            const sql = 'sp_desactiva_movRetiro_capital :Id_RetiroCapital, :usuario, :estatus '

            const registro = await db.query( sql, { replacements:{ Id_RetiroCapital :Id, usuario:usuario, estatus:estatus} } )

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

    public async setAsignaMovimientoCliente( asignaPrestamosDto:AsignaPrestamosDto ) {
        try {

            // console.log( {'ver valores':valores} )

            let respuestaFinal
            const { 
                Id_Mov_RN, Id_ICPC, Tipo_Cliente, usuario,
             } = asignaPrestamosDto

            const sql = 'sp_asigna_mov_NoReconocido :Id_Mov_RN, :Id_ICPC, :Tipo_Cliente, :usuario'

            const registro = await db.query( sql, { replacements:{ 
                Id_Mov_RN: Id_Mov_RN,
                Id_ICPC: Id_ICPC,
                Tipo_Cliente: Tipo_Cliente,
                usuario: usuario,
            } } )

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                // throw GeneraError.servidorInterno('Error interno del servidor');
                 respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }
            }else{
                respuestaFinal = { mensaje:'Asignación exitosa', status:'ok' }
            }

            return respuestaFinal

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`Ocurrio un error inesperado`)
        }
    }


    public async setActualizaPrestamos( actualizaMovRetiroCapitalDto: ActualizaMovRetiroCapitalDto) {

        try {

            console.log({Datos:actualizaMovRetiroCapitalDto})
            let respData:any
            const { Id_RetiroCapital, Id_CuentaB, monto, justificacion, usuario,
             } = actualizaMovRetiroCapitalDto

            const sql =  'sp_actualiza_retiro_capital :Id_RetiroCapital, :Id_CuentaB, :monto, :justificacion, :usuario '

            const registro = await db.query(sql, {
            replacements: {
                Id_RetiroCapital: Id_RetiroCapital,
                Id_CuentaB: Id_CuentaB,
                monto: monto,
                justificacion: justificacion,
                usuario: usuario
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

                if (response.Respuesta != 'ok') {

                if( response.Respuesta == 'diferencia' ){
                    return respData = { mensaje:'La operacion no se pudo completar, existe una diferencia en la cuenta', status:'error' }
                }

                if( response.Respuesta == 'saldo' ){
                    return respData = { mensaje:'La operacion no se pudo completar, Saldo insuficiente', status:'error' }
                }
                  
                // throw GeneraError.servidorInterno('Error interno del servidor');
            }else{
                return respData = { mensaje:'El movimiento se ha almacenado', status:200 }
            }
                return { mensaje:'prueba', status:'error' }
            
        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }


    public async agregaPrestamos( agregarMovRetiroCapitalDto: AgregarMovRetiroCapitalDto) {
        try {

            console.log({Datos:agregarMovRetiroCapitalDto})

            let respData:any
            const {  Id_CuentaB, monto, justificacion, usuario } = agregarMovRetiroCapitalDto

            const sql =  'sp_inserta_retiro_capital :Id_CuentaB, :monto, :justificacion, :usuario '
             
            const registro = await db.query(sql, {
                replacements: {
                    Id_CuentaB: Id_CuentaB,
                    monto: monto,
                    justificacion: justificacion,
                    usuario: usuario
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {

                if( response.Respuesta == 'diferencia' ){
                    return respData = { mensaje:'La operacion no se pudo completar, existe una diferencia en la cuenta', status:'error' }
                }

                if( response.Respuesta == 'saldo' ){
                    return respData = { mensaje:'La operacion no se pudo completar, Saldo insuficiente', status:'error' }
                }
                  
                // throw GeneraError.servidorInterno('Error interno del servidor');
            }else{
                return respData = { mensaje:'El movimiento se ha almacenado', status:200 }
            }

            // return { mensaje: 'Captura exitosa' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

    formatoDigitoBancarioPeticion( digito:string ){
        return digito.replace(/\D/g, "");
    }

    formatoSalfoPeticion( saldo:string ){
        return saldo.replace(/,/g, '');
      }
}
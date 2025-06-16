
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregaPrestamosDto } from "../../core/DTOS/movPrestamos/agrega-Prestamos.dto";
import { EditaPrestamosDto } from "../../core/DTOS/movPrestamos/edita-Prestamos.dto";
import { AsignaPrestamosDto } from "../../core/DTOS/movPrestamos/asigna-Prestamos.dto";


export class PrestamosServicio {
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

            const sql = 'sp_carga_cuentas_prestamos_list'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_prestamoInterno'
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

            
            const sql = 'sp_carga_prestamoInterno_seleccionado :Id_Fondeo'
            const busqueda = await db.query( sql, { replacements:{ Id_Fondeo:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarPrestamos( valores:any ) {
        try {

            console.log( {'ver valores':valores} )

            const { Id, usuario, estatus} = valores

            const sql = 'sp_desactiva_prestamoInterno :Id_Fondeo, :usuario, :estatus '

            const registro = await db.query( sql, { replacements:{ Id_Fondeo:Id, usuario:usuario, estatus:estatus} } )

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


    public async setActualizaPrestamos( editaPrestamosDto: EditaPrestamosDto) {

        try {

            console.log({Datos:editaPrestamosDto})

            const {    Id_Fondeo, id_cuentaB, monto, usuario,
             } = editaPrestamosDto

            const sql =  'sp_actualiza_prestamoInterno :Id_Fondeo, :id_cuentaB, :monto, :usuario '

            const registro = await db.query(sql, {
            replacements: {
                    Id_Fondeo: Id_Fondeo,
                    id_cuentaB: id_cuentaB,
                    monto: monto,
                    usuario: usuario,
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


    public async agregaPrestamos( agregaPrestamosDto: AgregaPrestamosDto) {
        try {

            console.log({Datos:agregaPrestamosDto})

            const {  id_cuentaB, monto, usuario,
             } = agregaPrestamosDto

            const sql =  'sp_inserta_prestamoInterno :id_cuentaB, :monto, :usuario '
             
            const registro = await db.query(sql, {
                replacements: {
                    id_cuentaB: id_cuentaB,
                    monto: monto,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                  
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Captura exitosa' }


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
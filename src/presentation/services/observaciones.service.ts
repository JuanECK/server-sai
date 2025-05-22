
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregaObservacionesDto } from "../../core/DTOS/observaciones/agrega-observaciones.dto";
import { EditaObservacionesDto } from "../../core/DTOS/observaciones/edita-observaciones.dto";
import { AsignaObservacionesDto } from "../../core/DTOS/observaciones/asigna-observaciones.dto";


export class ObservacionesServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Observaciones_Bancaria'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getCuentasListas() {
        try {

            const sql = 'sp_carga_cuentas_list'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_Mov_NoReconocidos'
            const listaAll = await db.query(sql)
            
            return listaAll

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
            const sql = 'sp_busqueda_listado_clientes :parametro'
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
            throw GeneraError.noEncontrado(`${error}`)
        }
    }

    public async cargaObservacionesId( id:string ) {
        try {

            
            const sql = 'sp_carga_movNR_seleccionado :Id_Mov_RN'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_RN:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarObservaciones( valores:any ) {
        try {

            console.log( {'ver valores':valores} )

            const { Id, usuario, estatus} = valores

            const sql = 'sp_desactiva_movNoReconocidos :Id_Mov_RN, :usuario, :estatus '

            const registro = await db.query( sql, { replacements:{ Id_Mov_RN:Id, usuario:usuario, estatus:estatus} } )

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

    public async setAsignaMovimientoCliente( asignaObservacionesDto:AsignaObservacionesDto ) {
        try {

            // console.log( {'ver valores':valores} )

            let respuestaFinal
            const { 
                Id_Mov_RN, Id_ICPC, Tipo_Cliente, usuario,
             } = asignaObservacionesDto

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


    public async setActualizaObservaciones( editaObservacionesDto: EditaObservacionesDto) {

        try {

            console.log({Datos:editaObservacionesDto})

            const {    Id_Mov_RN, Tipo_Movimiento, Id_CuentaB, Monto, Fecha_Ingreso, Observaciones, usuario, estatus,
             } = editaObservacionesDto

            const sql =  'sp_actualiza_movNoReconocidos :Id_Mov_RN, :Tipo_Movimiento, :Id_CuentaB, :Monto, :Fecha_Ingreso, :Observaciones, :usuario, :estatus '

            const registro = await db.query(sql, {
            replacements: {
            Id_Mov_RN: Id_Mov_RN,
            Tipo_Movimiento: Tipo_Movimiento,
            Id_CuentaB: Id_CuentaB,
            Monto: Monto,
            Fecha_Ingreso: Fecha_Ingreso,
            Observaciones: Observaciones,
            usuario: usuario,
            estatus: estatus,
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


    public async agregaObservaciones( agregaObservacionesDto: AgregaObservacionesDto) {
        try {

            console.log({Datos:agregaObservacionesDto})

            const {    Tipo_Movimiento, Id_CuentaB, Monto, Fecha_Ingreso, Observaciones, usuario,
             } = agregaObservacionesDto

            const sql =  'sp_inserta_movNoReconocidos :Tipo_Movimiento, :Id_CuentaB, :Monto, :Fecha_Ingreso, :Observaciones, :usuario '
             
            const registro = await db.query(sql, {
                replacements: {
                    Tipo_Movimiento: Tipo_Movimiento,
                    Id_CuentaB: Id_CuentaB,
                    Monto: Monto,
                    Fecha_Ingreso: Fecha_Ingreso,
                    Observaciones: Observaciones,
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
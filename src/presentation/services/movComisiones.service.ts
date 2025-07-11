
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregarMovComisionesDto } from "../../core/DTOS/MovComisiones/agrega-MovComisiones.dto";
import { ActualizaMovComisionesDto } from "../../core/DTOS/MovComisiones/actualiza-MovComisiones.dto";


export class MovComisionesServicio {
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
            
            const modeloNegocio = 'sp_carga_modeloNegocio_comision'
            const comisionista = 'sp_carga_comisionista_comision'
            const cuentas = 'sp_carga_cuentas_comision_list'
            const listaNegocio = await db.query(modeloNegocio)
            const listacomisionista = await db.query(comisionista)
            const listacuentas = await db.query(cuentas)

            array.push(listaNegocio[0],listacomisionista[0],listacuentas[0])
            
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
            const sql = 'sp_busqueda_movComisiones :parametro'
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

            console.log(respuesta)
            
            return respData

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_comisiones'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovComisionesId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_movComision_seleccionado :Id_Mov_Com  '
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Com :id } } )
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

            const sql = 'sp_desactiva_movComision :Id_Mov_Com, :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Com:Id, usuario:usuario, estatus:estatus} } )

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


    public async setActualizaMovComisiones( actualizaMovComisionesDto: ActualizaMovComisionesDto) {

        try {

            console.log({agregarMovInvercionDto:actualizaMovComisionesDto})
        
           
             const {   Id_Mov_Com, Id_ModeloNegocio, Id_ICPC, Id_CuentaB, Tipo_Movimiento, Monto, Observaciones, usuario, estatus,
            } = actualizaMovComisionesDto

            const sql = 'sp_actualiza_movComision :Id_Mov_Com, :Id_ModeloNegocio, :Id_ICPC, :Id_CuentaB, :Tipo_Movimiento, :Monto, :Observaciones, :usuario, :estatus'

            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Com:Id_Mov_Com,
                    Id_ModeloNegocio:Id_ModeloNegocio,
                    Id_ICPC:Id_ICPC,
                    Id_CuentaB:Id_CuentaB,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Monto:Monto,
                    Observaciones:Observaciones,
                    usuario:usuario,
                    estatus:estatus,
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



    public async agregaMovComisiones( agregarMovComisionesDto: AgregarMovComisionesDto) {

        try {
 
            let respuestaApi:any
            console.log({Datos:agregarMovComisionesDto})

             const {  Id_ModeloNegocio, Id_ICPC, Id_CuentaB, Tipo_Movimiento, Monto, Observaciones, usuario, 
            } = agregarMovComisionesDto

            const sql = 'sp_inserta_movComision :Id_ModeloNegocio, :Id_ICPC, :Id_CuentaB, :Tipo_Movimiento, :Monto, :Observaciones, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    Id_ModeloNegocio:Id_ModeloNegocio,
                    Id_ICPC:Id_ICPC,
                    Id_CuentaB:Id_CuentaB,
                    Tipo_Movimiento:Tipo_Movimiento,
                    Monto:Monto,
                    Observaciones:Observaciones,
                    usuario:usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log({movComision: response})

            if (response.Respuesta != 'ok') {
                if (response.Respuesta == 'no'){
                respuestaApi = { mensaje: 'No hay saldo suficiente para justificar tu operacion' }
                }else{

                    respuestaApi = { mensaje: 'Error interno del servidor' }
                }
                // throw GeneraError.servidorInterno('Error interno del servidor');
            }else{
                respuestaApi = { mensaje: 'El movimiento se ha registrado' }
            }


            // console.log(agregarMovInvercionDto)
            return respuestaApi


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

}
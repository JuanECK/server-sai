
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregarAbonoDto } from "../../core/DTOS/MovPresupuesto/agrega-Abono.dto";
import { ActualizaAbonoDto } from "../../core/DTOS/MovPresupuesto/actualiza-Abono.dto";
import { ModificacionPresupuestoDto } from "../../core/DTOS/MovPresupuesto/actualiza-Modificacion.dto";


export class MovPresupuestoServicio {
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
            const PresupuestoMensual = 'sp_verifica_presupuesto_mensual'
            const CuentasLista = 'sp_carga_cuentas_presupuesto_list'
            const Presupuesto = await db.query(PresupuestoMensual)
            const Cuentas = await db.query(CuentasLista)
            array.push(Presupuesto[0],Cuentas[0])

            // console.log({arr:array})

            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setInsertaPresupuestoMensual( presupuesto:any ) {
        try {

            console.log(presupuesto)

            let respuestaFinal

            console.log(presupuesto)
            const { monto, usuario } = presupuesto
            const sql = 'sp_inserta_presupuesto_mensual :monto, :usuario '
            const busqueda = await db.query( sql, { replacements:{ monto:monto, usuario:usuario } } )
            
            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))
            console.log(respuesta)

            if( respuesta.Resultado == 'ok'){
                respuestaFinal = { mensaje:'Error Inesperado', status:'error' }
            }else{
                respuestaFinal = { mensaje:'El presupuesto se ha actualizado' }
            }
            
            return respuestaFinal

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_presupuesto'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getPresupuestoMensual() {
        try {
            const sql = 'sp_obtiene_presupuesto_mensual'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovPresupuestoId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_abono_seleccionado :id_abono'
            const busqueda = await db.query( sql, { replacements:{ id_abono:id } } )

            console.log(busqueda)

            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    // public async cargaEstatusPagadoId( id:string ) {
    //     try {
    //         console.log({id:id})
    //         const sql = 'sp_carga_movPresupuestocion_pagar :Id_Mov_Fact '
    //         const busqueda = await db.query( sql, { replacements:{ Id_Mov_Fact:id } } )

    //         console.log(busqueda)

    //         return busqueda

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    public async setEliminarRegistro( valores:any ) {
        try {

            console.log(valores)

            const { Id, estatus, usuario } = valores

            const sql = 'sp_desactiva_abono :id_abono , :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ id_abono:Id, usuario:usuario, estatus:estatus} } )

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


    public async setModificacionPresupuestoMensual( modificacionPresupuestoDto: ModificacionPresupuestoDto) {

        try {


            console.log({AbonoDto:modificacionPresupuestoDto})
        
             const {   monto, tipo, observaciones, usuario,
            } = modificacionPresupuestoDto

            const sql = 'sp_inserta_Incremento_disminucion  :monto, :tipo, :observaciones, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                    monto: monto,
                    tipo: tipo,
                    observaciones: observaciones,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            // console.log(response)

            if (response.Resultado != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'El ajuste al Presupuesto se ha efectuado' }

            // throw GeneraError.servidorInterno(`error`)

        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async setActualizaAbonoMensual( actualizaAbonoDto: ActualizaAbonoDto) {

        try {


            console.log({AbonoDto:ActualizaAbonoDto})
        
             const {  id_abono, id_cuentaB, monto, usuario, Observaciones
            } = actualizaAbonoDto

            const sql = 'sp_actualiza_abono  :id_abono, :id_cuentaB, :monto, :usuario, :Observaciones'

            const registro = await db.query(sql, {
                replacements: {
                    id_abono: id_abono,
                    id_cuentaB: id_cuentaB,
                    monto: monto,
                    usuario: usuario,
                    Observaciones:Observaciones
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Modificación exitosa' }

            // throw GeneraError.servidorInterno(`error`)

        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }



    public async agregaAbonoPresupuestoMensual( agregarAbonoDto: AgregarAbonoDto) {

        try {
                
            console.log({Datos:agregarAbonoDto})

             const {   id_cuentaB, monto, usuario, Observaciones
            } = agregarAbonoDto

            const sql = 'sp_inserta_abono :monto,:id_cuentaB,:usuario, :Observaciones'

            const registro = await db.query(sql, {
                replacements: {
                    monto: monto,
                    id_cuentaB: id_cuentaB,
                    usuario: usuario,
                    Observaciones:Observaciones
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                  
                throw GeneraError.servidorInterno('Error interno del servidor');

            }


            return { mensaje: 'El abono se ha registrado' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
    // public async cambiaEstatusPagado( cambiaEstatusPagadoDto: CambiaEstatusPagadoDto) {
    //     // const validExtensions:string[] = ['pdf']

    //     // console.log({Archivos:files})

    //     try {
                
    //         console.log({Datos:cambiaEstatusPagadoDto})

    //          const {    Id_Mov_Fact, estatus_pagado, Id_CuentaB, usuario
    //         } = cambiaEstatusPagadoDto

    //         const sql = 'sp_cambia_movPresupuestocion_pagado :Id_Mov_Fact, :estatus_pagado, :Id_CuentaB, :usuario'

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
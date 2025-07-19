
import { GeneraError } from "../../core";
import { ActualizaMovDivisasDto } from "../../core/DTOS/MovDivisas/actualiza-MovDivisas.dto";
import { AgregarMovDivisasDto } from "../../core/DTOS/MovDivisas/agrega-MovDivisas.dto";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";

export class MovDivisasServicio {
    constructor() { }

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
            
            const cliente = 'sp_carga_cliente_divisa'
            // const concepto = 'sp_carga_concepto_divisas'
            // const divisasYued = 'sp_carga_concepto_divisas_Yued'
            // const cuentasDivisas = 'sp_carga_cuentas_divisas'
            // const cuentasYued = 'sp_carga_cuentas_Yued'
            // const ids_Yued = 'sp_carga_ids_Yued'
            // const Yued_Pesos = 'sp_carga_cuentas_divisas_Yued_Pesos'
            // const Yued_Dolar = 'sp_carga_cuentas_divisas_Yued_Dolar'
            const listaCliente = await db.query(cliente)
            // const listaConcepto = await db.query(concepto)
            // const listaDivisasYued = await db.query(divisasYued)
            // const listaCuentasDivisas = await db.query(cuentasDivisas)
            // const listaCuentasYued = await db.query(cuentasYued)
            // const listaidsYued = await db.query(ids_Yued)
            // const listaYuedPesos = await db.query(Yued_Pesos)
            // const listaYuedDolar = await db.query(Yued_Dolar)

            // array.push(listaCliente[0],listaDivisasYued[0],listaCuentasDivisas[0],listaCuentasYued[0],listaidsYued[0],listaYuedPesos[0],listaYuedDolar[0])

            // console.log(array)
            
            return listaCliente

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    
    public async getCargaConcepto( idcp:string ) {

        interface MiData {
        Conceptos: string;
        Cuentas: string;
        }

        try {

            console.log(idcp)

            const concepto = 'sp_carga_concepto_divisas :Id_ICPC '
            const listaConcepto = await db.query(concepto, { replacements:{ Id_ICPC : idcp} })
            const rawData: any =  listaConcepto[0][0]
            const data = JSON.parse(rawData.Resultado)

            // console.log(JSON.parse(rawData.Resultado).Conceptos)

            // const data = rawData as { Conceptos: string; Cuentas: string };

            // const conceptos = JSON.parse(data.Conceptos);
            // const cuentas = JSON.parse(data.Cuentas);

            // console.log(conceptos)

            // const safeData = data as MiData;
            // const conceptos = JSON.parse(safeData.Conceptos);
            // const cuentas = JSON.parse(safeData.Cuentas);

            // console.log(conceptos[0].Concepto);
            // console.log(cuentas[0].alias);


            // if (typeof data === 'object' && data !== null && 'Conceptos' in data && 'Cuentas' in data) {
            // }       

            // console.log(JSON.parse(JSON.stringify(data)))

            // const conceptos = JSON.parse(data.Conceptos);
            //     const cuentas = JSON.parse(data.Cuentas);

            //     // Ahora puedes trabajar con ellos como arreglos de objetos
            //     console.log(conceptos[0].Concepto); // "Compra divisas"
            //     console.log(cuentas[0].alias); 

            return data

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
            const sql = 'sp_busqueda_movDivisas :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

             if( respuesta[0].Resultado == 'Sindatos'){

                respData = { status:'error', mensaje:'No se Encontraron Coincidencias' }
                // throw ('No se Encontraron Coincidencias')
            }else{

                respData = { status:200, data: busqueda }
            }
            
            return respData

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getSaldoYued( id:string ) {
        try {


            const sql = 'sp_cargaSaldo_movDivisa_Yued :Id_ICPC '
            const busqueda = await db.query( sql, { replacements:{ Id_ICPC:id } } )
            
            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))
            
            if( respuesta.length === 0){
                throw ('No se Encontraron Coincidencias')
            }
            console.log(busqueda)
            
            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getHistorico() {
        try {

            const sql = 'sp_historico_MovDivisas'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaMovDivisasId( id:string ) {
        try {
            console.log({id:id})
            const sql = 'sp_carga_movDivisa_seleccionado :Id_Mov_Div'
            const busqueda = await db.query( sql, { replacements:{ Id_Mov_Div:id } } )
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

            const sql = 'sp_desactiva_movDivisa :Id_Mov_Div, :usuario, :estatus'

            const registro = await db.query( sql, { replacements:{ Id_Mov_Div:Id, usuario:usuario, estatus:estatus} } )

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


    public async setActualizaMovDivisas( actualizaMovDivisasDto: ActualizaMovDivisasDto) {

        try {

            console.log({agregarMovInvercionDto:actualizaMovDivisasDto})
           
         const {  Id_Mov_Div,Id_ICPC,Concepto,Id_CuentaB,Tipo_Movimiento,Monto,Comision,Observaciones,usuario,estatus, 
           
            } = actualizaMovDivisasDto

            const sql = 'sp_actualiza_movDivisa :Id_Mov_Div,:Id_ICPC,:Concepto,:Id_CuentaB,:Tipo_Movimiento,:Monto,:Comision,:Observaciones,:usuario,:estatus'
            const registro = await db.query(sql, {
                replacements: {
                    Id_Mov_Div: Id_Mov_Div,
                    Id_ICPC: Id_ICPC,
                    Concepto: Concepto,
                    Id_CuentaB: Id_CuentaB,
                    Tipo_Movimiento: Tipo_Movimiento,
                    Monto: Monto,
                    Comision: Comision,
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

            throw GeneraError.servidorInterno(`error`)

        } catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }



    public async agregaMovDivisas( agregarMovDivisasDto: AgregarMovDivisasDto) {

        try {
 
            console.log({Datos:agregarMovDivisasDto})

             const {    Id_ICPC, Concepto, Id_CuentaB, Tipo_Movimiento, Monto, Comision, Observaciones, usuario, 
            } = agregarMovDivisasDto

            const sql = 'sp_inserta_movDivisa  :Id_ICPC, :Concepto, :Id_CuentaB, :Tipo_Movimiento, :Monto, :Comision, :Observaciones, :usuario'

            const registro = await db.query(sql, {
                replacements: {
                  
                    Id_ICPC: Id_ICPC,
                    Concepto: Concepto,
                    Id_CuentaB: Id_CuentaB,
                    Tipo_Movimiento: Tipo_Movimiento,
                    Monto: Monto,
                    Comision: Comision,
                    Observaciones: Observaciones,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            console.log(response)

            if (response.Respuesta != 'ok') {

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
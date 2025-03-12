import { cryptoAdapter } from "../../config"
import { GeneraError } from "../../core"
import { db } from "../../data/mysql/db/coneccion"


export class DashboardServicio {

    constructor(){}

    public async dashboard(){

        const array:Array<any>[] = []

        try {
            
            const PI = 'exec sp_prestamos_internos_dash'
            const AE = 'exec sp_adeudo_Europe_dash'
            const AEA = 'sp_adeudo_Europe_abonos_dash'
            const SC = 'exec sp_saldo_cuentas_dash'
            const CDS = 'exec sp_carga_diferencia_saldos_dash'
            const CDG = 'exec sp_carga_diferencia_global_dash'

            const prestamos = await db.query(PI)
            const adeudos = await db.query(AE)
            const abonos = await db.query(AEA)
            const cuentas = await db.query(SC)
            const saldos = await db.query(CDS)
            const diferencia = await db.query(CDG)

            array.push(prestamos[0],adeudos[0],abonos[0],cuentas[0],saldos[0],diferencia[0])
            // array.push([{prestamoInterno:prestamos[0]},{adeudoEurope:adeudos[0]},{saldoCuentas:cuentas[0]},{DiferenciaSaldos:saldos[0]}])
            // console.log(array)

            return array
            // return { servicio:array }
            
        } catch (error) {
            console.log( error )
            throw GeneraError.servidorInterno( 'Error Inesperado' );
        }

    }

    public async setSaldoInicial(  saldo:string, identificador:string, usuario:string ){

        try {

            console.log( saldo, identificador, usuario)
            
            const data = this.parseCriptoID( usuario)
            if( !data.Id ) throw GeneraError.noAutorizado('ID incorrecto')

            const sql = `exec sp_actualiza_saldo_inicial ${identificador}, ${saldo}, ${data.Id}`;
            const result = await db.query(sql)
            const { Respuesta } = JSON.parse(JSON.stringify(result[0][0])) 
            if( Respuesta === 0 ) throw GeneraError.badRespuesta('Error al actualizar saldo inicial')
            // console.log( result[0][0])

            return { Respuesta: 'OK'} 

        } catch (error) {
            console.log( error )
            throw GeneraError.servidorInterno( 'Error inesperado' )  
        }

    }

    parseCriptoID (id:string){
        try {
                
            const data = JSON.parse(cryptoAdapter.muestraSecreto(id))
            console.log(data)
            console.log(data.id_Perfil)
            return data

        } catch (error) {
            return []
        }
    }

}
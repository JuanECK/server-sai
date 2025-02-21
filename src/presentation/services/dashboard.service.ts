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

            const prestamos = await db.query(PI)
            const adeudos = await db.query(AE)
            const abonos = await db.query(AEA)
            const cuentas = await db.query(SC)
            const saldos = await db.query(CDS)

            array.push(prestamos[0],adeudos[0],abonos[0],cuentas[0],saldos[0])
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
            
            const data = this.parseCriptoID( usuario)
            if( !data ) throw GeneraError.noAutorizado('ID incorrecto')


            const sql = `exec sp_set_saldo_inicial ${identificador}, ${saldo}, ${data.id_Perfil}`;
            const result = await db.query(sql)

            return result

        } catch (error) {
            
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
import { Router } from "express";
import { db } from "../../data/mysql/db/coneccion";
import { DashboardServicio } from "../services/dashboard.service";
import { InicioControlador } from "./controlador.inicio";


export class InicioRutas {

    static get routes():Router{

        const router = Router();

        const dashboardServicio = new DashboardServicio();
        const controlador = new InicioControlador( dashboardServicio )

        router.get('/dashboard', controlador.dashboard)
        router.get('/saldoInicial', controlador.setSaldoInicial)

        // router.get('/dashboard', async function( req, res ){
            
        //     const array:Array<any>[] = []
            
        //     // const sql = 'exec sp_carga_dash'
        //     const PI = 'exec sp_prestamos_internos_dash'
        //     const AE = 'exec sp_adeudo_Europe_dash'
        //     const SC = 'exec sp_saldo_cuentas_dash'
        //     const CDS = 'exec sp_carga_diferencia_saldos_dash'
        //     const prestamos = await db.query(PI)
        //     const adeudos = await db.query(AE)
        //     const cuentas = await db.query(SC)
        //     const saldos = await db.query(CDS)

        //     array.push([{prestamoInterno:prestamos[0]},{adeudoEurope:adeudos[0]},{saldoCuentas:cuentas[0]},{DiferenciaSaldos:saldos[0]}])
        //     console.log(array)
        //     res.json(array[0])
        // })

        return router 
    }
}
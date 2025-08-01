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
        router.post('/saldoInicial', controlador.setSaldoInicial)
        return router 
    }
}
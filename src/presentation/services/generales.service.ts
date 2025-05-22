
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";



export class GeneralesServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async getEstado() {
        try {

            const sql = 'exec sp_carga_Estado';
            const estado = await db.query(sql)

            return estado;

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)

        }
    }
    public async getReferidoBRK() {
        try {

            const sql = 'sp_carga_recomendado_Inversionista'
            const BRK = await db.query(sql)
            return BRK;

        }
        catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getReferidoComisionista() {
        try {

            const sql = 'sp_carga_recomendado_comisionista'
            const comisionista = await db.query(sql)
            return comisionista;

        }
        catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getMunicipio(estado: string) {
        try {

            const sql = 'exec sp_carga_Municipio :id_estado'
            const municipio = await db.query(sql, { replacements: { id_estado: estado } })
            return municipio;

        }
        catch (error) {
            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

}

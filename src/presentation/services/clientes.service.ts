import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";


export class ClientesServicio{
    constructor(){}

    public async getEstado(){
        try {
            
            const sql = 'exec sp_carga_Estado';
            const estado = await db.query(sql)

            return estado;

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno( `${error}` )
            
        }
    }

    public async getMunicipio ( estado:string ){
        try{

            const sql = 'exec sp_carga_Municipio :id_estado'
            const municipio = await db.query( sql, { replacements:{ id_estado: estado }})
            return municipio;

        }
        catch( error ){
            console.log(error)
            throw GeneraError.servidorInterno( `${error}` )
        }
    }
}
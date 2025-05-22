
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { EditaProveedorDto } from "../../core/DTOS/proveedor/edita-proveedor.dto";
import { AgregaPublicoDto } from "../../core/DTOS/publico/agrega-publico.dto";
import { EditaPublicoDto } from "../../core/DTOS/publico/edita-publico.dto";


export class PublicoServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_publico'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

             let respuestaFinal

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }

            console.log(criterio)
            const sql = 'sp_busqueda_Publico :parametro'
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

    public async cargaPublicoId( id:string ) {
        try {

            
            const sql = 'sp_carga_publico_seleccionado :Id_ICPC'
            const busqueda = await db.query( sql, { replacements:{ Id_ICPC:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarPublico( valores:any ) {
        try {

            // console.log( {'ver valores':valores} )

            const { Id_ICPC, estatus, usuario } = valores

            const sql = 'sp_desactiva_publico :Id_ICPC, :estatus, :usuario'

            const registro = await db.query( sql, { replacements:{ Id_ICPC:Id_ICPC, usuario:usuario, estatus:estatus } } )

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


    public async setActualizaPublico( editaPublicoDto: EditaPublicoDto) {

        try {

            
            console.log({Datos:editaPublicoDto})

            const {   nombre, fisica_moral, correo, telefono, Id_ICPC, usuario, Banco_cuenta, CLABE, FINCASH, Banco_tarjeta, tarjeta, Estatus
             } = editaPublicoDto

            const sql =  'sp_actualiza_info_publico :nombre, :fisica_moral, :correo, :telefono, :Id_ICPC, :usuario, :Banco_cuenta, :CLABE, :FINCASH, :Banco_tarjeta, :tarjeta, :Estatus'

            const registro = await db.query(sql, {
                replacements: {
                    nombre:nombre,
                    fisica_moral:fisica_moral,
                    correo:correo,
                    telefono:telefono,
                    Id_ICPC:Id_ICPC,
                    usuario:usuario,
                    Banco_cuenta:Banco_cuenta,
                    CLABE:CLABE,
                    FINCASH:FINCASH,
                    Banco_tarjeta:Banco_tarjeta,
                    tarjeta:tarjeta,
                    Estatus:Estatus,
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


    public async agregaPublico( agregarProveedorDto: AgregaPublicoDto) {
        try {

            console.log({Datos:agregarProveedorDto})

            const {  nombre, fisica_moral, correo, telefono, usuario, Banco_cuenta, CLABE, FINCASH, Banco_tarjeta, tarjeta,
             } = agregarProveedorDto

            const sql =  'sp_inserta_publico   :nombre, :fisica_moral, :correo, :telefono, :usuario, :Banco_cuenta, :CLABE, :FINCASH, :Banco_tarjeta, :tarjeta'
             

            const registro = await db.query(sql, {
                replacements: {
                    nombre:nombre,
                    fisica_moral:fisica_moral,
                    correo:correo,
                    telefono:telefono,
                    usuario:usuario,
                    Banco_cuenta:Banco_cuenta,
                    CLABE:CLABE,
                    FINCASH:FINCASH,
                    Banco_tarjeta:Banco_tarjeta,
                    tarjeta:tarjeta,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                  
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
}
import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { RegistraInversionistaDto } from "../../core/DTOS/Comisionista/registra-inversionista.dto";
import { response } from "express";
import { AgregarInversionistaDto } from "../../core/DTOS/inversionista/agrega-inversionista.dto";
import { EdicionInversionistaDto } from "../../core/DTOS/inversionista/edita-inversionista.dto";
import { AgregaProveedorDto } from "../../core/DTOS/proveedor/agrega-proveedor.dto";
import { EditaProveedorDto } from "../../core/DTOS/proveedor/edita-proveedor.dto";


export class ProveedoresServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_proveedor'
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
            const sql = 'sp_busqueda_Proveedor :parametro'
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

    public async cargaProveedorId( id:string ) {
        try {

            
            const sql = 'sp_carga_proveedor_seleccionado :Id_ICPC'
            const busqueda = await db.query( sql, { replacements:{ Id_ICPC:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarProveedor( valores:any ) {
        try {

            // console.log( {'ver valores':valores} )

            const { Id_ICPC, estatus, usuario } = valores

            const sql = 'sp_desactiva_proveedor :Id_ICPC, :usuario, :estatus '

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


    public async setActualizaProveedor( editaProveedorDto: EditaProveedorDto) {

        try {

            
            console.log({Datos:editaProveedorDto})

            const {  nombre, fisica_moral, correo, telefono, actividad, Id_ICPC, usuario, RFC, Banco_cuenta, CLABE, Banco_tarjeta, tarjeta, Estatus
             } = editaProveedorDto

            const sql =  'sp_actualiza_info_proveedor :nombre, :fisica_moral, :correo, :telefono, :actividad, :Id_ICPC, :usuario, :RFC, :Banco_cuenta, :CLABE, :Banco_tarjeta, :tarjeta, :Estatus'

            const registro = await db.query(sql, {
                replacements: {
                    nombre: nombre,
                    fisica_moral: fisica_moral,
                    correo: correo,
                    telefono: telefono,
                    actividad: actividad,
                    Id_ICPC: Id_ICPC,
                    usuario: usuario,
                    RFC: RFC,
                    Banco_cuenta: Banco_cuenta,
                    CLABE: CLABE,
                    Banco_tarjeta: Banco_tarjeta,
                    tarjeta: tarjeta,
                    Estatus: Estatus,
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


    public async agregaProveedor( agregarProveedorDto: AgregaProveedorDto) {
        try {

            console.log({Datos:agregarProveedorDto})

            const { 
                nombre, fisica_moral, correo, telefono, actividad, usuario, RFC, Banco_cuenta, CLABE, Banco_tarjeta, tarjeta, 
             } = agregarProveedorDto

            const sql =  'sp_inserta_proveedor :nombre, :fisica_moral, :correo, :telefono, :actividad, :usuario, :RFC, :Banco_cuenta, :CLABE, :Banco_tarjeta, :tarjeta'

            const registro = await db.query(sql, {
                replacements: {
                    nombre:nombre,
                    fisica_moral:fisica_moral,
                    correo:correo,
                    telefono:telefono,
                    actividad:actividad,
                    usuario:usuario,
                    RFC:RFC,
                    Banco_cuenta:Banco_cuenta,
                    CLABE:CLABE,
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
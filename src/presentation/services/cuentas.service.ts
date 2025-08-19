
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { FileUploadService } from "./file-upload.service";
import { AgregaCuentaDto } from "../../core/DTOS/cuenta/agrega-cuenta.dto";
import { EditaCuentaDto } from "../../core/DTOS/cuenta/edita-cuenta.dto";


export class CuentasServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Cuenta_Bancaria'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getModeloNegocio() {
        try {

            const sql = 'sp_carga_ModelosNegocio'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getDivisa() {
        try {

            const sql = 'sp_carga_Divisa'
            const listaAll = await db.query(sql)
            
            return listaAll

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async getBusqueda( criterio:string ) {
        try {

console.log(criterio)

             let respuestaFinal

            if( criterio === '' ){
                throw ('Sin criterio de busqueda');
            }

            console.log(criterio)
            const sql = 'sp_busqueda_Cuenta_Bancaria :parametro'
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

    public async cargaCuentaId( id:string ) {
        try {

            
            const sql = 'sp_carga_Cuenta_seleccionada :Id_cuenta'
            const busqueda = await db.query( sql, { replacements:{ Id_cuenta:id } } )
            // console.log(busqueda)

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            return data

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarCuenta( valores:any ) {
        try {

            // console.log( {'ver valores':valores} )

            const { Id_cuenta, estatus, usuario } = valores

            const sql = 'sp_desactiva_cuenta_bancaria :Id_cuenta, :estatus, :usuario'

            const registro = await db.query( sql, { replacements:{ Id_cuenta:Id_cuenta, estatus:estatus, usuario:usuario} } )

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


    public async setActualizaCuenta( editaCuentaDto: EditaCuentaDto) {

        try {

            editaCuentaDto.noCuenta = this.formatoDigitoBancarioPeticion( editaCuentaDto.noCuenta )
            editaCuentaDto.clabe = this.formatoDigitoBancarioPeticion( editaCuentaDto.clabe )
            editaCuentaDto.tarjeta = this.formatoDigitoBancarioPeticion( editaCuentaDto.tarjeta )

            console.log({Datos:editaCuentaDto})

            const {   Id_cuenta, nombreBanco, noCuenta, saldoInicial, clabe, tarjeta, alias, moneda, modelo, estatus, usuario 
             } = editaCuentaDto

            const sql =  'sp_actualiza_cuenta_bancaria :Id_cuenta, :nombreBanco, :noCuenta, :saldoInicial, :clabe, :tarjeta, :alias, :moneda, :modelo, :estatus, :usuario '

            const registro = await db.query(sql, {
                replacements: {
                    nombreBanco: nombreBanco,
                    noCuenta: noCuenta,
                    saldoInicial: saldoInicial,
                    clabe: clabe,
                    tarjeta: tarjeta,
                    alias: alias,
                    moneda: moneda,
                    modelo: modelo,
                    usuario: usuario,
                    Id_cuenta: Id_cuenta,
                    estatus: estatus,
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


    public async agregaCuenta( agregaCuentaDto: AgregaCuentaDto) {
        try {

            agregaCuentaDto.noCuenta = this.formatoDigitoBancarioPeticion( agregaCuentaDto.noCuenta )
            agregaCuentaDto.clabe = this.formatoDigitoBancarioPeticion( agregaCuentaDto.clabe )
            agregaCuentaDto.tarjeta = this.formatoDigitoBancarioPeticion( agregaCuentaDto.tarjeta )
            agregaCuentaDto.saldoInicial = this.formatoSalfoPeticion( agregaCuentaDto.saldoInicial )

            console.log({Datos:agregaCuentaDto})

            const {   nombreBanco, noCuenta, saldoInicial, clabe, tarjeta, alias, moneda, modelo, usuario,
             } = agregaCuentaDto

            const sql =  'sp_inserta_cuenta_bancaria :nombreBanco, :noCuenta, :saldoInicial, :clabe, :tarjeta, :alias, :moneda, :modelo, :usuario '
             

            const registro = await db.query(sql, {
                replacements: {
                    nombreBanco: nombreBanco,
                    noCuenta: noCuenta,
                    saldoInicial: saldoInicial,
                    clabe: clabe,
                    tarjeta: tarjeta,
                    alias: alias,
                    moneda: moneda,
                    modelo: modelo,
                    usuario: usuario,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            console.log(response)

            if (response.Respuesta != 'ok') {
                // if (){
                //     La cuenta con esta CLABE ya existe
                // }
                  
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }

    formatoDigitoBancarioPeticion( digito:string ){
        return digito.replace(/\D/g, "");
    }

    formatoSalfoPeticion( saldo:string ){

        if(saldo == '0'){
            return saldo
        }
        return saldo.replace(/,/g, '');
      }
}
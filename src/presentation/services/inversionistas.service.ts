import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { RegistraInversionistaDto } from "../../core/DTOS/Comisionista/registra-inversionista.dto";
import { response } from "express";
import { AgregarInversionistaDto } from "../../core/DTOS/inversionista/agrega-inversionista.dto";
import { EdicionInversionistaDto } from "../../core/DTOS/inversionista/edita-inversionista.dto";


export class InversionistasServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Inversionista'
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

            const sql = 'sp_busqueda_Inversionista :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )
            
            console.log(busqueda)
            const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

            if(respuesta[0].Resultado == 'Sindatos'){
                respuestaFinal = { mensaje:'No se Encontraron Coincidencias', status:'error' }

            }else{
                respuestaFinal = busqueda
            }
            
            return respuestaFinal

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }
    public async getDataInicial() {
        try {

            let array:Array<any>[] = [];

            const sqlEstados = 'sp_carga_Estado'
            const sqlPaises = 'sp_catalogo_paises'

            const estados = await db.query( sqlEstados )
            const paises = await db.query( sqlPaises )
            array.push( estados[0], paises[0] )
            
            // console.log(array)
            // const respuesta = JSON.parse(JSON.stringify(busqueda[0]))

            
            return array

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async cargaInversionistaId( id:string ) {
        try {

            let datosBeneficiario:Array<any> = [
                {Beneficiario1:'',
                Fecha_Nac_Beneficiario1:'',
                Porcentaje_Beneficiario1:'',
                Beneficiario2:'',
                Fecha_Nac_Beneficiario2:'',
                Porcentaje_Beneficiario2:'',
                Beneficiario3:'',
                Fecha_Nac_Beneficiario3:'',
                Porcentaje_Beneficiario3:'',
                Beneficiario4:'',
                Fecha_Nac_Beneficiario4:'',
                Porcentaje_Beneficiario4:'',
                Beneficiario5:'',
                Fecha_Nac_Beneficiario5:'',
                Porcentaje_Beneficiario5:''}
            ]

            // let datosBeneficiario:Array<any> = [
            //     {
            //     Beneficiario1:'',
            //     Beneficiario2:'',
            //     Beneficiario3:'',
            //     Beneficiario4:'',
            //     Beneficiario5:''
            //     }
            // ]

            const sql = 'sp_carga_Inversionista_seleccionado :Id_ICPC'
            const busqueda = await db.query( sql, { replacements:{ Id_ICPC:id } } )

            const data  = JSON.parse(JSON.stringify(busqueda[0]))

            data[0].BRK = data[0].BRK.replace(/\D/g, "")

            console.log({inversionista:data})

            for (let i = Object.keys(data[0]).length - 1; i >= 27; i--) {
                let dato = Object.keys(data[0])[i];
                let valor = Object.values(data[0])[i];

                datosBeneficiario[0][dato] = valor
                
                // for( let j = 1; j < Object.keys(datosBeneficiario[0]).length; j++ ){
                    
                    
                //     if(dato == 'Beneficiario'+j){
                //         datosBeneficiario[0]['Beneficiario'+j] = valor

                //     }
                    
                // }
            }



            // console.log(Object.keys(datosBeneficiario[0]).length)

            

            // for (let i = Object.keys(data).length - 1; i >= 27; i--) {
            //         let dato = Object.keys(data)[i];
            //         let valor = Object.values(data)[i];

            //         datosBeneficiario[0][dato] = valor

            // }


            console.log(datosBeneficiario)
            return {busqueda:data, datosBeneficiario:datosBeneficiario}

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarRegistro( valores:any ) {
        try {

            console.log(typeof valores)

            const { Id_ICPC, estatus, usuario } = valores

            const sql = 'sp_desactiva_Inversionista :Id_ICPC, :usuario, :estatus '

            const registro = await db.query( sql, { replacements:{ Id_ICPC:Id_ICPC, usuario:usuario, estatus:estatus } } )

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {

                if ( response.Respuesta == 'No' ){
                    return { mensaje:'El Inversionista ya tiene movimientos asiciados', status:'error' }
                }

                return { mensaje:'Error interno del servidor', status:'error' }

            }

            return { mensaje: 'Registro Eliminado', status:200  }

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async registraInversionista( registraInversionistaDto:RegistraInversionistaDto ) {
        try {

            console.log(registraInversionistaDto)
            const { usuario, Id_ICPC, BRK, Fecha_Nac, Beneficiario1, Fecha_Nac_Beneficiario1, Porcentaje_Beneficiario1, Beneficiario2, Fecha_Nac_Beneficiario2, Porcentaje_Beneficiario2, Beneficiario3, Fecha_Nac_Beneficiario3, Porcentaje_Beneficiario3, Beneficiario4, Fecha_Nac_Beneficiario4, Porcentaje_Beneficiario4, Beneficiario5, Fecha_Nac_Beneficiario5, Porcentaje_Beneficiario5, Recomendado, Fecha_Contrato, estatus } = registraInversionistaDto
            const sql = 'sp_agrega_portafolio_Inversionista :usuario, :Id_ICPC, :BRK, :Fecha_Nac, :Beneficiario1, :Fecha_Nac_Beneficiario1, :Porcentaje_Beneficiario1, :Beneficiario2, :Fecha_Nac_Beneficiario2, :Porcentaje_Beneficiario2, :Beneficiario3, :Fecha_Nac_Beneficiario3, :Porcentaje_Beneficiario3, :Beneficiario4, :Fecha_Nac_Beneficiario4, :Porcentaje_Beneficiario4, :Beneficiario5, :Fecha_Nac_Beneficiario5, :Porcentaje_Beneficiario5, :Recomendado, :Fecha_Contrato, :estatus'
            const registro = await db.query(sql, { replacements:{
                usuario: usuario,
                Id_ICPC: Id_ICPC,
                BRK: BRK,
                Fecha_Nac: Fecha_Nac,
                Beneficiario1: Beneficiario1,
                Fecha_Nac_Beneficiario1: Fecha_Nac_Beneficiario1,
                Porcentaje_Beneficiario1: Porcentaje_Beneficiario1,
                Beneficiario2: Beneficiario2,
                Fecha_Nac_Beneficiario2: Fecha_Nac_Beneficiario2,
                Porcentaje_Beneficiario2: Porcentaje_Beneficiario2,
                Beneficiario3: Beneficiario3,
                Fecha_Nac_Beneficiario3: Fecha_Nac_Beneficiario3,
                Porcentaje_Beneficiario3: Porcentaje_Beneficiario3,
                Beneficiario4: Beneficiario4,
                Fecha_Nac_Beneficiario4: Fecha_Nac_Beneficiario4,
                Porcentaje_Beneficiario4: Porcentaje_Beneficiario4,
                Beneficiario5: Beneficiario5,
                Fecha_Nac_Beneficiario5: Fecha_Nac_Beneficiario5,
                Porcentaje_Beneficiario5: Porcentaje_Beneficiario5,
                Recomendado: Recomendado,
                Fecha_Contrato: Fecha_Contrato,
                estatus: estatus,
            }})

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta != 'ok') {
                throw GeneraError.servidorInterno('Error interno del servidor');
            }

            return { mensaje: 'Protafolio de Inversión creado exitosamente' }

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setActualizaInversionista(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', agregarComisionistaDto: EdicionInversionistaDto) {

        try {

            // const uploadDoc = await this.fileUploadService.uploadDocument(files, folder)  
            // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }

            // console.log({files:files})
            // console.log({comprobantesNames:comprobantesNames})
            // console.log({folder:folder})
            // console.log({agregarComisionistaDto:agregarComisionistaDto})

            
            
            if( agregarComisionistaDto.Comprobante_Domicilio == '' || agregarComisionistaDto.INE == '' ){
                console.log('Hay que actualizar')
                const { NameDomicilio, NameIdentificacion } = comprobantesNames
                let Arr = {fileName:'',fileName2:''}

                if( agregarComisionistaDto.Comprobante_Domicilio =='' ){
                    Arr.fileName = NameDomicilio
                }
                if( agregarComisionistaDto.INE =='' ){
                    Arr.fileName2 = NameIdentificacion
                }

                await this.fileUploadService.deleteFile(Arr, folder)
                
                const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
                if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')

                console.log(uploadDoc)


                if( Arr.fileName != ''){
                    agregarComisionistaDto.Comprobante_Domicilio = uploadDoc[0].fileName
                }
                if( Arr.fileName2 !='' ){
                agregarComisionistaDto.INE = uploadDoc[1].fileName
                }
            }

            console.log({agregarComisionistaDto:agregarComisionistaDto})

            // const { nombre, fisica_moral, correo, telefono, usuario, banco_cuenta, CLABE, fincash, Banco_tarjeta, tarjeta, RFC, Comprobante_domicilio, INE, Referido, Fecha_contrato, Calle, No_Exterior, No_Interior, Colonia, Id_Estado, Id_Municipio, CP, estatus, Id_ICPC } = agregarComisionistaDto
            
            const {  Id_ICPC, nombre, fisica_moral, correo, telefono, usuario, Fecha_Nac, RFC, Beneficiario1, Fecha_Nac_Beneficiario1, Porcentaje_Beneficiario1, Beneficiario2, Fecha_Nac_Beneficiario2, Porcentaje_Beneficiario2, Beneficiario3, Fecha_Nac_Beneficiario3, Porcentaje_Beneficiario3, Beneficiario4, Fecha_Nac_Beneficiario4, Porcentaje_Beneficiario4, Beneficiario5, Fecha_Nac_Beneficiario5, Porcentaje_Beneficiario5, Banco_cuenta, CLABE, FINCASH, Banco_Tarjeta, Tarjeta, INE, Comprobante_Domicilio, Recomendado, Fecha_Contrato, Calle, No_Exterior, No_Interior, Colonia, Id_Estado, Id_Municipio, CP, estatus, Id_Pais,
            } = agregarComisionistaDto
            const sql =  'sp_actualiza_info_Inversionista :Id_ICPC, :nombre, :fisica_moral, :correo, :telefono, :usuario, :Fecha_Nac, :RFC, :Beneficiario1, :Fecha_Nac_Beneficiario1, :Porcentaje_Beneficiario1, :Beneficiario2, :Fecha_Nac_Beneficiario2, :Porcentaje_Beneficiario2, :Beneficiario3, :Fecha_Nac_Beneficiario3, :Porcentaje_Beneficiario3, :Beneficiario4, :Fecha_Nac_Beneficiario4, :Porcentaje_Beneficiario4, :Beneficiario5, :Fecha_Nac_Beneficiario5, :Porcentaje_Beneficiario5, :Banco_cuenta, :CLABE, :FINCASH, :Banco_Tarjeta, :Tarjeta, :INE, :Comprobante_Domicilio, :Recomendado, :Fecha_Contrato, :Calle, :No_Exterior, :No_Interior, :Colonia, :Id_Estado, :Id_Municipio, :CP, :estatus, :Id_Pais'

            // const sql = 'sp_actualiza_info_comisionista :nombre, :fisica_moral, :correo, :telefono, :usuario, :banco_cuenta, :CLABE, :fincash, :Banco_tarjeta, :tarjeta, :RFC, :Comprobante_domicilio, :INE, :Referido, :Fecha_contrato, :Calle, :No_Exterior, :No_Interior, :Colonia, :Id_Estado, :Id_Municipio, :CP, :estatus, :Id_ICPC '

            const registro = await db.query(sql, {
                replacements: {
                    Id_ICPC: Id_ICPC,
                    nombre: nombre,
                    fisica_moral: fisica_moral,
                    correo: correo,
                    telefono: telefono,
                    // BRK: BRK,
                    usuario: usuario,
                    Fecha_Nac: Fecha_Nac,
                    RFC: RFC,
                    Beneficiario1: Beneficiario1,
                    Fecha_Nac_Beneficiario1: Fecha_Nac_Beneficiario1,
                    Porcentaje_Beneficiario1: Porcentaje_Beneficiario1,
                    Beneficiario2: Beneficiario2,
                    Fecha_Nac_Beneficiario2: Fecha_Nac_Beneficiario2,
                    Porcentaje_Beneficiario2: Porcentaje_Beneficiario2,
                    Beneficiario3: Beneficiario3,
                    Fecha_Nac_Beneficiario3: Fecha_Nac_Beneficiario3,
                    Porcentaje_Beneficiario3: Porcentaje_Beneficiario3,
                    Beneficiario4: Beneficiario4,
                    Fecha_Nac_Beneficiario4: Fecha_Nac_Beneficiario4,
                    Porcentaje_Beneficiario4: Porcentaje_Beneficiario4,
                    Beneficiario5: Beneficiario5,
                    Fecha_Nac_Beneficiario5: Fecha_Nac_Beneficiario5,
                    Porcentaje_Beneficiario5: Porcentaje_Beneficiario5,
                    Banco_cuenta: Banco_cuenta,
                    CLABE: CLABE,
                    FINCASH: FINCASH,
                    Banco_Tarjeta: Banco_Tarjeta,
                    Tarjeta: Tarjeta,
                    INE: INE,
                    Comprobante_Domicilio: Comprobante_Domicilio,
                    Recomendado: Recomendado,
                    Fecha_Contrato: Fecha_Contrato,
                    Calle: Calle,
                    No_Exterior: No_Exterior,
                    No_Interior: No_Interior,
                    Colonia: Colonia,
                    Id_Estado: Id_Estado,
                    Id_Municipio: Id_Municipio,
                    CP: CP,
                    estatus:estatus,
                    Id_Pais:Id_Pais,
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


    public async AgregaInversionista(files: UploadedFile[], folder: string = 'uploads', agregarInversionistaDto: AgregarInversionistaDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})
        // console.log({Datos:agregarInversionistaDto})


        try {

            const fileNames = await this.fileUploadService.getNameFile( files )
            console.log(fileNames)

            agregarInversionistaDto.Comprobante_Domicilio = fileNames[0].fileName
            agregarInversionistaDto.INE = fileNames[1].fileName

            console.log({Datos:agregarInversionistaDto})


            // let valor = agregarInversionistaDto.fisica_moral === 1 ? true :false
            // agregarInversionistaDto.fisica_moral = valor



            const {  nombre, fisica_moral, correo, telefono, BRK, usuario, Fecha_Nac, RFC, Beneficiario1, Fecha_Nac_Beneficiario1, Porcentaje_Beneficiario1, Beneficiario2, Fecha_Nac_Beneficiario2, Porcentaje_Beneficiario2, Beneficiario3, Fecha_Nac_Beneficiario3, Porcentaje_Beneficiario3, Beneficiario4, Fecha_Nac_Beneficiario4, Porcentaje_Beneficiario4, Beneficiario5, Fecha_Nac_Beneficiario5, Porcentaje_Beneficiario5, Banco_cuenta, CLABE, FINCASH, Banco_Tarjeta, Tarjeta, INE, Comprobante_Domicilio, Recomendado, Fecha_Contrato, Calle, No_Exterior, No_Interior, Colonia, Id_Estado, Id_Municipio, CP, Id_Pais,
             } = agregarInversionistaDto

            const sql =  'sp_inserta_Inversionista :nombre, :fisica_moral, :correo, :telefono, :BRK, :usuario, :Fecha_Nac, :RFC, :Beneficiario1, :Fecha_Nac_Beneficiario1, :Porcentaje_Beneficiario1, :Beneficiario2, :Fecha_Nac_Beneficiario2, :Porcentaje_Beneficiario2, :Beneficiario3, :Fecha_Nac_Beneficiario3, :Porcentaje_Beneficiario3, :Beneficiario4, :Fecha_Nac_Beneficiario4, :Porcentaje_Beneficiario4, :Beneficiario5, :Fecha_Nac_Beneficiario5, :Porcentaje_Beneficiario5, :Banco_cuenta, :CLABE, :FINCASH, :Banco_Tarjeta, :Tarjeta, :INE, :Comprobante_Domicilio, :Recomendado, :Fecha_Contrato, :Calle, :No_Exterior, :No_Interior, :Colonia, :Id_Estado, :Id_Municipio, :CP, :Id_Pais'

            const registro = await db.query(sql, {
                replacements: {
                    nombre: nombre,
                    fisica_moral: fisica_moral,
                    correo: correo,
                    telefono: telefono,
                    BRK: BRK,
                    usuario: usuario,
                    Fecha_Nac: Fecha_Nac,
                    RFC: RFC,
                    Beneficiario1: Beneficiario1,
                    Fecha_Nac_Beneficiario1: Fecha_Nac_Beneficiario1,
                    Porcentaje_Beneficiario1: Porcentaje_Beneficiario1,
                    Beneficiario2: Beneficiario2,
                    Fecha_Nac_Beneficiario2: Fecha_Nac_Beneficiario2,
                    Porcentaje_Beneficiario2: Porcentaje_Beneficiario2,
                    Beneficiario3: Beneficiario3,
                    Fecha_Nac_Beneficiario3: Fecha_Nac_Beneficiario3,
                    Porcentaje_Beneficiario3: Porcentaje_Beneficiario3,
                    Beneficiario4: Beneficiario4,
                    Fecha_Nac_Beneficiario4: Fecha_Nac_Beneficiario4,
                    Porcentaje_Beneficiario4: Porcentaje_Beneficiario4,
                    Beneficiario5: Beneficiario5,
                    Fecha_Nac_Beneficiario5: Fecha_Nac_Beneficiario5,
                    Porcentaje_Beneficiario5: Porcentaje_Beneficiario5,
                    Banco_cuenta: Banco_cuenta,
                    CLABE: CLABE,
                    FINCASH: FINCASH,
                    Banco_Tarjeta: Banco_Tarjeta,
                    Tarjeta: Tarjeta,
                    INE: INE,
                    Comprobante_Domicilio: Comprobante_Domicilio,
                    Recomendado: Recomendado,
                    Fecha_Contrato: Fecha_Contrato,
                    Calle: Calle,
                    No_Exterior: No_Exterior,
                    No_Interior: No_Interior,
                    Colonia: Colonia,
                    Id_Estado: Id_Estado,
                    Id_Municipio: Id_Municipio,
                    CP: CP,
                    Id_Pais: Id_Pais,
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))

            if (response.Respuesta == 'duplicado') {
                  
                throw GeneraError.servidorInterno('El BRK esta duplicado');
            }

            const uploadDoc = await this.fileUploadService.ActualizaDocumentoSinNombre(files, folder, fileNames)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error al intentar almacenar el documento PDF')

            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
}
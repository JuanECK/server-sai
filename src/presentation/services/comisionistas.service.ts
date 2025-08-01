import { constrainedMemory } from "process";
import { GeneraError } from "../../core";
import { db } from "../../data/mysql/db/coneccion";
import { AgregarComisionistaDto } from "../../core/DTOS/Comisionista/agrega-comisionista.dto";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "./file-upload.service";
import { RegistraInversionistaDto } from "../../core/DTOS/Comisionista/registra-inversionista.dto";
import { response } from "express";


export class ComisionistasServicio {
    constructor(
        private readonly fileUploadService = new FileUploadService
    ) { }

    // public async getEstado() {
    //     try {

    //         const sql = 'exec sp_carga_Estado';
    //         const estado = await db.query(sql)

    //         return estado;

    //     } catch (error) {

    //         console.log(error);
    //         throw GeneraError.servidorInterno(`${error}`)

    //     }
    // }

    // public async getMunicipio(estado: string) {
    //     try {

    //         const sql = 'exec sp_carga_Municipio :id_estado'
    //         const municipio = await db.query(sql, { replacements: { id_estado: estado } })
    //         return municipio;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }
    // public async getReferidoComisionista() {
    //     try {

    //         const sql = 'sp_carga_recomendado_comisionista'
    //         const comisionista = await db.query(sql)
    //         return comisionista;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }
    // public async getReferidoBRK() {
    //     try {

    //         const sql = 'sp_carga_recomendado_brk'
    //         const BRK = await db.query(sql)
    //         return BRK;

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw GeneraError.servidorInterno(`${error}`)
    //     }
    // }

    public async BusquedaAll() {
        try {

            const sql = 'sp_carga_Comisionista'
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
            const sql = 'sp_busqueda_Comisionista :parametro'
            const busqueda = await db.query( sql, { replacements:{ parametro:criterio } } )

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

    public async cargaComisionistaId( id:string ) {
        try {

            const sql = 'sp_carga_Comisionista_seleccionado :Id_ICPC'
            const busqueda = await db.query( sql, { replacements:{ Id_ICPC:id } } )
            return busqueda

        } catch (error) {

            console.log(error);
            throw GeneraError.servidorInterno(`${error}`)
        }
    }

    public async setEliminarRegistro( valores:any ) {
        try {

            console.log(typeof valores)

            const { Id_ICPC, estatus, usuario } = valores

            const sql = 'sp_desactiva_comisionista :Id_ICPC, :estatus, :usuario'

            const registro = await db.query( sql, { replacements:{ Id_ICPC:Id_ICPC, estatus:estatus, usuario:usuario } } )

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

    public async registraInversionista( registraInversionistaDto:RegistraInversionistaDto ) {
        try {

            console.log(registraInversionistaDto)
            const { usuario, Id_ICPC, BRK, Fecha_Nac, Beneficiario1, Fecha_Nac_Beneficiario1, Porcentaje_Beneficiario1, Beneficiario2, Fecha_Nac_Beneficiario2, Porcentaje_Beneficiario2, Beneficiario3, Fecha_Nac_Beneficiario3, Porcentaje_Beneficiario3, Beneficiario4, Fecha_Nac_Beneficiario4, Porcentaje_Beneficiario4, Beneficiario5, Fecha_Nac_Beneficiario5, Porcentaje_Beneficiario5, Recomendado, Fecha_Contrato, estatus } = registraInversionistaDto
            const sql = ' sp_agrega_portafolio_Inversionista :usuario, :Id_ICPC, :BRK, :Fecha_Nac, :Beneficiario1, :Fecha_Nac_Beneficiario1, :Porcentaje_Beneficiario1, :Beneficiario2, :Fecha_Nac_Beneficiario2, :Porcentaje_Beneficiario2, :Beneficiario3, :Fecha_Nac_Beneficiario3, :Porcentaje_Beneficiario3, :Beneficiario4, :Fecha_Nac_Beneficiario4, :Porcentaje_Beneficiario4, :Beneficiario5, :Fecha_Nac_Beneficiario5, :Porcentaje_Beneficiario5, :Recomendado, :Fecha_Contrato, :estatus'
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

    public async setActualizaComisionista(files: UploadedFile[], comprobantesNames:any, folder: string = 'uploads', agregarComisionistaDto: AgregarComisionistaDto) {

        try {

            // const uploadDoc = await this.fileUploadService.uploadDocument(files, folder)  
            // const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }

            // console.log({files:files})
            // console.log({comprobantesNames:comprobantesNames})
            // console.log({folder:folder})
            // console.log({agregarComisionistaDto:agregarComisionistaDto})

            
            if( agregarComisionistaDto.Comprobante_domicilio == '' || agregarComisionistaDto.INE == '' ){
                console.log('Hay que actualizar')
                const { NameDomicilio, NameIdentificacion } = comprobantesNames
                let Arr = {fileName:'',fileName2:''}

                if( agregarComisionistaDto.Comprobante_domicilio =='' ){
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
                    agregarComisionistaDto.Comprobante_domicilio = uploadDoc[0].fileName
                }
                if( Arr.fileName2 !='' ){
                agregarComisionistaDto.INE = uploadDoc[1].fileName
                }
            }

            console.log({agregarComisionistaDto:agregarComisionistaDto})

            const { nombre, fisica_moral, correo, telefono, usuario, banco_cuenta, CLABE, fincash, Banco_tarjeta, tarjeta, RFC, Comprobante_domicilio, INE, Referido, Fecha_contrato, Calle, No_Exterior, No_Interior, Colonia, Id_Estado, Id_Municipio, CP, estatus, Id_ICPC } = agregarComisionistaDto
            const sql = 'sp_actualiza_info_comisionista :nombre, :fisica_moral, :correo, :telefono, :usuario, :banco_cuenta, :CLABE, :fincash, :Banco_tarjeta, :tarjeta, :RFC, :Comprobante_domicilio, :INE, :Referido, :Fecha_contrato, :Calle, :No_Exterior, :No_Interior, :Colonia, :Id_Estado, :Id_Municipio, :CP, :estatus, :Id_ICPC '

            const registro = await db.query(sql, {
                replacements: {
                    nombre: nombre,
                    fisica_moral: fisica_moral,
                    correo: correo,
                    telefono: telefono,
                    usuario: usuario,
                    banco_cuenta: banco_cuenta,
                    CLABE: CLABE,
                    fincash: fincash,
                    Banco_tarjeta: Banco_tarjeta,
                    tarjeta: tarjeta,
                    RFC: RFC,
                    Comprobante_domicilio: Comprobante_domicilio,
                    INE: INE,
                    Referido: Referido,
                    Fecha_contrato: Fecha_contrato,
                    Calle: Calle,
                    No_Exterior: No_Exterior,
                    No_Interior: No_Interior,
                    Colonia: Colonia,
                    Id_Estado: Id_Estado,
                    Id_Municipio: Id_Municipio,
                    CP: CP,
                    estatus: estatus, 
                    Id_ICPC: Id_ICPC,
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


    public async AgregaComisionista(files: UploadedFile[], folder: string = 'uploads', agregarComisionistaDto: AgregarComisionistaDto) {
        // const validExtensions:string[] = ['pdf']

        // console.log({Archivos:files})

        try {

            
            const uploadDoc = await this.fileUploadService.ActualizaDocument(files, folder)
            if (!uploadDoc) throw GeneraError.servidorInterno('Error inesperado del servidor')

            agregarComisionistaDto.Comprobante_domicilio = uploadDoc[0].fileName
            agregarComisionistaDto.INE = uploadDoc[1].fileName

            console.log({Datos:agregarComisionistaDto})

            const { nombre, fisica_moral, correo, telefono, usuario, banco_cuenta, CLABE, fincash, Banco_tarjeta, tarjeta, RFC, Comprobante_domicilio, INE, Referido, Fecha_contrato, Calle, No_Exterior, No_Interior, Colonia, Id_Estado, Id_Municipio, CP } = agregarComisionistaDto

            const sql = 'sp_inserta_Comisionista :nombre, :fisica_moral, :correo, :telefono, :usuario, :banco_cuenta, :CLABE, :fincash, :Banco_tarjeta, :tarjeta, :RFC, :Comprobante_domicilio, :INE, :Referido, :Fecha_contrato, :Calle, :No_Exterior, :No_Interior, :Colonia, :Id_Estado, :Id_Municipio, :CP '

            const registro = await db.query(sql, {
                replacements: {
                    nombre: nombre,
                    fisica_moral: fisica_moral,
                    correo: correo,
                    telefono: telefono,
                    usuario: usuario,
                    banco_cuenta: banco_cuenta,
                    CLABE: CLABE,
                    fincash: fincash,
                    Banco_tarjeta: Banco_tarjeta,
                    tarjeta: tarjeta,
                    RFC: RFC,
                    Comprobante_domicilio: Comprobante_domicilio,
                    INE: INE,
                    Referido: Referido,
                    Fecha_contrato: Fecha_contrato,
                    Calle: Calle,
                    No_Exterior: No_Exterior,
                    No_Interior: No_Interior,
                    Colonia: Colonia,
                    Id_Estado: Id_Estado,
                    Id_Municipio: Id_Municipio,
                    CP: CP
                }
            })

            const response = JSON.parse(JSON.stringify(registro[0][0]))
            // console.log(response)

            if (response.Respuesta != 'ok') {

                const Arr = { fileName: uploadDoc[0].fileName, fileName2: uploadDoc[1].fileName }
                // console.log({Arr:Arr, foler:folder})
                    this.fileUploadService.deleteFile(Arr, folder)
                  
                throw GeneraError.servidorInterno('Error interno del servidor');

            }


            // console.log(agregarComisionistaDto)
            return { mensaje: 'Registro exitoso' }


        } catch (error) {

            console.log(error)
            throw GeneraError.servidorInterno(`${error}`)

        }


    }
}
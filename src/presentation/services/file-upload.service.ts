import { Uuid } from "../../config/uuid.adapter";
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import path from "path";
import { GeneraError } from "../../core";
import { CalculaMB } from "../../config/calculaMB.adapter";

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4) { }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }
    }


    async uploadSingle2(file: UploadedFile, folder: string = 'uploads', fileName:string) {

        try {

            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);

            file.mv(`${destination}/${fileName}`)

        }
        catch (error) {
            console.log(error)
            throw error

        }

    }


    public async ActualizaDocumentoSinNombre(files: UploadedFile[], folder: string = 'uploads', fileNames:any) {

        try {

            files.map((file, index) => {
    
                this.uploadSingle2(file, folder, fileNames[index].fileName)
            })

            return true
            
        } catch (error) {
            console.log(error)
            throw error
        }



    }
    public async ActualizaDocumentoSinNombreMetodo2(files: UploadedFile[], folder: string = 'uploads', fileNames:any) {
        // console.log({files33333:files})
        try {
            files.map((file, index) => {
                if(files[index].name != '0SAF0_SAF0.pdf' ){
                    // console.log({ActualizarArchivo:fileNames[index].fileName})
                    this.uploadSingle2(file, folder, fileNames[index].fileName)
                }
    
            })

            return true
            
        } catch (error) {
            console.log(error)
            throw error
        }



    }
    // public async ActualizaDocumentoSimpleMetodo2(files: UploadedFile[], folder: string = 'uploads', fileNames:any) {
    //     try {
    //         files.map((file, index) => {
                
    //             if(files[index].name != '0SAF0_SAF0.pdf' ){
    //                 console.log({files33333:file})
    //                 // console.log({ActualizarArchivo:fileNames[index].fileName})
    //                 this.uploadSingle2(file, folder, fileNames[index].fileName)
    //             }
    
    //         })

    //         return true
            
    //     } catch (error) {
    //         console.log(error)
    //         throw error
    //     }



    // }

    async getNameFile( files: UploadedFile[], validExtensions: string[] = ['pdf']){

        // console.log({Nombre:files})
        // console.log({Nombre:files[0].name})
    
        const filesName = await Promise.all(
    
            files.map((file, index) => {
    
                const fileExtension = file.mimetype.split('/').at(1) ?? '';
                    if (!validExtensions.includes(fileExtension)) {
                        throw GeneraError.badRespuesta(`Extension invalida: ${fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}`)
                        // throw new Error( `Extension invalida: ${ fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}` )
                    }
    
                    if (file.size > 1 * 1024 * 1024) {
    
                        throw GeneraError.badRespuesta(`Tamaño de archivo excedido: ${CalculaMB.bytesToSize(file.size)}, !!Solo se admiten archivos de 1MB`)
                        // throw GeneraError.badRespuesta( `Tamaño de archivo excedido: ${ file.size } bytes, !!Solo se admiten archivos de 1MB` )
        
                    }
    
                    const fileName = `${this.uuid()}.${fileExtension}`
                    return { fileName }
    
            })
    
        )
    
        return filesName
    
    }
    async getNameFileForma2( files: UploadedFile[], validExtensions: string[] = ['pdf']){

        // let Arr = {fileName:'',fileName2:''}

// console.log({files555:files})

        const filesName = await Promise.all(
    
            files.map((file, index) => {
    
                const fileExtension = file.mimetype.split('/').at(1) ?? '';
                    if (!validExtensions.includes(fileExtension)) {
                        throw GeneraError.badRespuesta(`Extension invalida: ${fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}`)
                        // throw new Error( `Extension invalida: ${ fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}` )
                    }
    
                    if (file.size > 1 * 1024 * 1024) {
    
                        throw GeneraError.badRespuesta(`Tamaño de archivo excedido: ${CalculaMB.bytesToSize(file.size)}, !!Solo se admiten archivos de 1MB`)
                        // throw GeneraError.badRespuesta( `Tamaño de archivo excedido: ${ file.size } bytes, !!Solo se admiten archivos de 1MB` )
        
                    }
                    
                    if(files[index].name != '0SAF0_SAF0.pdf' ){
                        const fileName = `${this.uuid()}.${fileExtension}`
                        return { fileName }
                    }else{
                        const fileName = ``
                        return { fileName }
                    }
    
            })
    
        )
    
        return filesName
    
    }
// -----------------------------------------------------------------------------------------------------------------


async uploadSingle(file: UploadedFile, index: number, folder: string = 'uploads', validExtensions: string[] = ['pdf']) {
    // async uploadSingle( file:UploadedFile, folder:string = 'uploads', validExtensions:string[] = ['png','jpg','jpeg','pdf'] ){

    try {
        const fileExtension = file.mimetype.split('/').at(1) ?? '';
        if (!validExtensions.includes(fileExtension)) {
            throw GeneraError.badRespuesta(`Extension invalida: ${fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}`)
            // throw new Error( `Extension invalida: ${ fileExtension}, !!Solo se admiten estas extensiones: ${validExtensions}` )
        }

        if (file.size > 1 * 1024 * 1024) {

            throw GeneraError.badRespuesta(`Tamaño de archivo excedido: ${CalculaMB.bytesToSize(file.size)}, !!Solo se admiten archivos de 1MB`)
            // throw GeneraError.badRespuesta( `Tamaño de archivo excedido: ${ file.size } bytes, !!Solo se admiten archivos de 1MB` )

        }

        const destination = path.resolve(__dirname, '../../../', folder);
        this.checkFolder(destination);

        const fileName = `${this.uuid()}.${fileExtension}`

        file.mv(`${destination}/${fileName}`)

        // console.log(file)


        return { fileName }

    }
    catch (error) {
        console.log(error)
        throw error

    }

}



    public async ActualizaDocument(files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['pdf']) {

        const filesName = await Promise.all(

            files.map((file, index) => this.uploadSingle(file, index, folder, validExtensions))

        )

        return filesName
    }


    // public async ActualizaDocumentMetodo2(files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['pdf']) {

    //     const filesName = await Promise.all(

    //         files.map((file, index) => {
    //             if(files[index].name != '0SAF0_SAF0.pdf' ){
    //                 this.uploadSingle(file, index, folder, validExtensions)
    //             }
    //         })

    //     )

    //     return filesName
    // }


    // public async updateDocument(files: UploadedFile[], folder: string = 'uploads', comprobantesNames:any, validExtensions: string[] = ['pdf']) {

    //     console.log(comprobantesNames)

    //     this.deleteFile( comprobantesNames, folder )
        
    //     const filesName = await Promise.all(

    //         files.map((file, index) => this.uploadSingle(file, index, folder, validExtensions))

    //     )

    //     return filesName
    // }


    
    public async deleteFile( fileName:any, type:string ) {
        // console.log({Arr:fileName, foler:type})
        for(let key in fileName){

            const filePath = path.resolve( __dirname,`../../../${type}/${fileName[key]}`)

            // console.log({BorrarArchivo:filePath})
            fs.unlink(filePath, (err)=>{})
        }
        return true
    }

}
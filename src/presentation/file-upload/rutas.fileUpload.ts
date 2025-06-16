import { Router } from "express";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadControlador } from "./controlador";


export class FileUloadRoutes {

    static get routes():Router{
        const router = Router();
        const controller = new FileUploadControlador( new FileUploadService() );

        router.use( FileUploadMiddelware.containFiles);
        router.use( TypeMiddleware.validTypes( ['comisionistas, inversionista, Financiamiento, movInmobiliario, movInvercion, movOficina, movProveedor'] ));


        // router.post( '/single/:type',controller.uploadFile )
        return router;
    }

}
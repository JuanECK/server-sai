import { Router } from "express";
import { FileUploadMiddelware } from "../middlewares/file.upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { FileDownloadControlador } from "./controlador";


export class FileDownloadRoutes {

    static get routes():Router{

        const router = Router();
        const controller = new FileDownloadControlador();
            router.get( '/:type/:fileName', controller.downloadFile)
            return router;

    }

}
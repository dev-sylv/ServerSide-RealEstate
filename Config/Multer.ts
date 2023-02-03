import multer from "multer";

import {Request} from "express";

type DestinationCallBack = (error: Error | null, destination: string) => void;
type FileCallBack = (error: Error | null, file: string) => void;

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallBack
    ) => {
        cb (null, "Uploads")
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileCallBack
    ) =>{
        cb(null, file.originalname)
    }
});

const houseUploads = multer({
    storage: storage
}).single("houseImage");

const agentsUpload = multer({
    storage: storage
}).single("agentImage");

export {agentsUpload, houseUploads};
import { Router } from "express";
import { FileController } from "../controllers/FileController.ts";
import { FileService } from "../../services/FileService.ts";
import { ENV } from "../../config/env.ts";

const router = Router();

const fileService: FileService = new FileService(ENV.FOLDER_NAME);
const fileController: FileController = new FileController(fileService);

router.post('/file', fileController.save);
router.get('/file/:filename', fileController.show);

export default router;
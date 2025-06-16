import { Router } from "express";
import { HistoryController } from "../controllers/HistoryController.ts";

const router = Router();

const historyController: HistoryController = new HistoryController();

router.get('/history', historyController.show);

export default router;
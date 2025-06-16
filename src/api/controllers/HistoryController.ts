import { NextFunction, Request, RequestHandler, Response } from "express";
import { HistoryService } from "../../services/HistoryService.ts";
import { HttpStatus } from "../../core/HttpStatus.ts";

export class HistoryController {
    show: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { error, timestamp } = req.query;
        try {
            await HistoryService.save(`[/history] Carregamento de Histórico.`);
            const errorStr = typeof error === 'string' ? error : '';
            const timestampStr = typeof timestamp === 'string' ? timestamp : '';
            const content = await HistoryService.getAll(errorStr, timestampStr);
            res.status(HttpStatus.OK).json({ message: 'Carregamento de Histórico', content });
        } catch (error) {
            await HistoryService.save(`[/history] Erro no carregamento do histórico.`);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro no carregamento do histórico.', error });
        }
    }
}
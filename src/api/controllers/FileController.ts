import { Request, RequestHandler, Response } from "express";
import { FileService } from "../../services/FileService.ts";
import { HttpStatus } from "../../core/HttpStatus.ts";
import { HistoryService } from "../../services/HistoryService.ts";
import { TypeLogs } from "../../infrastructure/domains/enums/TypeLogs.ts";

export class FileController {
    constructor(private readonly fileService: FileService) {}

    save: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { filename, content } = req.body;
        if (!filename || !content) {
            await HistoryService.save(`[/files] Filename e Content são obrigatórios.`, TypeLogs.WARN, '/api/files');
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Filename e Content são obrigatórios.' });
        }

        try {
            await this.fileService.saveMessage(filename, content);
            await HistoryService.save(`[/files] Salvando mensagem no arquivo ${filename} com o conteúdo: ${content}.`, TypeLogs.INFO, '/api/files');
            res.status(HttpStatus.CREATED).json({ message: 'Mensagem salva com sucesso.' });
        } catch (error) {
            HistoryService.save(`[/files] Erro ao salvar o arquivo.`, TypeLogs.ERROR, '/api/files');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao salvar o arquivo.', error });
        }
    }

    show: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { filename } = req.params;
        if (!filename) {
            await HistoryService.save(`[/file/:filename] Filename é obrigatório no ${filename}`, TypeLogs.WARN, '/api/files');
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Filename é obrigatório.' });
        }
        try {
            const content = await this.fileService.showContent(filename);   
            await HistoryService.save(`[/file/:filename] Buscando todas as mensagens salvas no arquivo ${filename}.`, TypeLogs.INFO, '/api/files');         
            res.status(HttpStatus.OK).json({ message: 'Mensagens carregadas com sucesso.', content });
        } catch (error) {
            await HistoryService.save(`[/file/:filename] Erro ao ler o arquivo ${filename}. ${error}`, TypeLogs.ERROR, '/api/files');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao ler o arquivo.', error });
        }
    }
}
import { Request, RequestHandler, Response } from "express";
import { FileService } from "../../services/FileService.ts";
import { HttpStatus } from "../../core/HttpStatus.ts";

export class FileController {
    constructor(private readonly fileService: FileService) {}

    save: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { filename, content } = req.body;
        if (!filename || !content) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Filename e Content são obrigatórios.' });
        }

        try {
            await this.fileService.saveMessage(filename, content);
            res.status(HttpStatus.CREATED).json({ message: 'Mensagem salva com sucesso.' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao salvar o arquivo.', error });
        }
    }

    show: RequestHandler = async (req: Request, res: Response): Promise<void> => {
        const { filename } = req.params;
        if (!filename) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Filename é obrigatório.' });
        }
        try {
            const content = await this.fileService.show(filename);
            res.status(HttpStatus.OK).json({ message: 'Mensagens carregadas com sucesso.', content });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao ler o arquivo.', error });
        }
    }
}
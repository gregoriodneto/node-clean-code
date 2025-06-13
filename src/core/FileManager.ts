import { __dirname } from './../config/paths.ts';
import fs from 'fs/promises';
import path from 'path';
import { Logger } from '../utils/logger.ts';

export class FileManager {
    private basePath: string;

    constructor(folderName: string) {
        this.basePath = path.join(__dirname, '../../files', folderName);
    }

    async createFile(fileName: string, content: string): Promise<void> {
        const filePath: string = path.join(this.basePath, fileName);
        await fs.mkdir(this.basePath, { recursive: true });
        await fs.writeFile(filePath, content);
        Logger.log(`Criado o arquivo ${fileName}`);
    }

    async readFile(fileName: string): Promise<string> {
        const filePath: string = path.join(this.basePath, fileName);
        const content: string = await fs.readFile(filePath, 'utf-8');
        Logger.log(`Leitura do arquivo ${fileName}`);
        return content;
    }

    async appendToFile(fileName: string, content: string): Promise<void> {
        const filePath: string = path.join(this.basePath, fileName);
        await fs.appendFile(filePath, content);
        Logger.log(`Adicionando conteúdo no arquivo ${fileName}`);
    }

    async exists(fileName: string): Promise<boolean> {
        const filePath: string = path.join(this.basePath, fileName);
        try {
            await fs.access(filePath);
            Logger.log(`Conteúdo do arquivo ${fileName} existe.`);
            return true;
        } catch {
            Logger.log(`Não existe o arquivo ${fileName}`);
            return false;
        }
    }
}
import { FileManager } from "../core/FileManager.ts";

export class FileService {
    private fileManager: FileManager;

    constructor(folder: string) {
        this.fileManager = new FileManager(folder);
    }

    async saveMessage(fileName: string, message: string): Promise<void> {
        const exists: boolean = await this.fileManager.exists(fileName);

        if (exists) {
            await this.fileManager.appendToFile(fileName, `\n${message}`);
        } else {
            await this.fileManager.createFile(fileName, message);
        }
    }

    async showContent(fileName: string): Promise<void> {
        const content: string = await this.fileManager.readFile(fileName);
        console.log('Conteúdo do arquivo:\n', content);
    }
}
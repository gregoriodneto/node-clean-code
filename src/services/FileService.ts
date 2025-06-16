import { FileManager } from "../core/FileManager.ts";

export class FileService {
    private static _instance: FileService;
    private fileManager: FileManager;

    constructor(folder: string) {
        this.fileManager = new FileManager(folder);
    }

    static getInstance(folder: string = 'files'): FileService {
        if (!FileService._instance) {
            FileService._instance = new FileService(folder);
        }
        return FileService._instance;
    }

    async saveMessage(fileName: string, message: string): Promise<void> {
        const exists: boolean = await this.fileManager.exists(fileName);

        if (exists) {
            await this.fileManager.appendToFile(fileName, `\n${message}`);
        } else {
            await this.fileManager.createFile(fileName, message);
        }
    }

    async showContent(fileName: string): Promise<string[]> {
        const content: string = await this.fileManager.readFile(fileName);
        console.log('Conteúdo do arquivo:\n', content);
        return content.split("\n");
    }
}
import { ENV } from "../config/env.ts";
import { Datas } from "../utils/datas.ts";
import { FileService } from "./FileService.ts";

export class HistoryService {
    private static _filename = ENV.FILE_NAME_HISTORY;

    constructor() { }

    private static get fileService(): FileService {
        return FileService.getInstance(ENV.FOLDER_NAME_HISTORY);
    }

    static async save(message: string) {
        const messageFormatted: string = Datas.dataTimestampFormmattedLogger(message);
        await this.fileService.saveMessage(this._filename, messageFormatted);
    }

    static async getAll() {
        return await this.fileService.showContent(this._filename);
    }
}
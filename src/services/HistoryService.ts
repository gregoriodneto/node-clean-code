import { ENV } from "../config/env.ts";
import { TypeLogs } from "../infrastructure/domains/enums/TypeLogs.ts";
import { HistoryRepository } from "../infrastructure/repositories/HistoryRepository.ts";
import { Datas } from "../utils/datas.ts";
import { Filters } from "../utils/Filters.ts";
import { FileService } from "./FileService.ts";

export class HistoryService {
    private static _filename = ENV.FILE_NAME_HISTORY;

    constructor() { }

    private static get fileService(): FileService {
        return FileService.getInstance(ENV.FOLDER_NAME_HISTORY);
    }

    static async save(message: string, type: TypeLogs = TypeLogs.INFO, path: string = '/api') {
        const messageFormatted: string = Datas.dataTimestampFormmattedLogger(message);
        await this.fileService.saveMessage(this._filename, messageFormatted);
        await HistoryRepository.instance.save(message, type, path);
    }

    static async getAll(error: string | undefined = '', timestamp: string | undefined = '') {
        const content = await this.fileService.showContent(this._filename);
        if (error.length > 0 && timestamp.length > 0) {
            return content.filter((data) => Filters.filtersInStringInArray(data, error) && Filters.filtersInStringInArray(data, timestamp));
        } else if (error.length > 0) {
            return content.filter((data) => Filters.filtersInStringInArray(data, error));
        } else if (timestamp.length > 0) {
            return content.filter((data) => Filters.filtersInStringInArray(data, timestamp));
        }
        return content;
    }
}
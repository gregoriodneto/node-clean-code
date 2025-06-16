import { Datas } from "./datas.ts";

export class Logger {
    constructor() {}

    static log(message: string, saveToHistory: boolean = true): string {
        const messageFormatted: string = Datas.dataTimestampFormmattedLogger(message);        
        console.log(messageFormatted);
        return messageFormatted;
    }

    static error(message: string, saveToHistory: boolean = true): string {
        const messageFormatted: string = Datas.dataTimestampFormmattedLogger(message);
        console.error(messageFormatted);
        return messageFormatted;
    }
}
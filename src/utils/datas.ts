export class Datas {
    constructor() {}
    
    static dataTimestampFormmattedLogger(message: string) {
        const timestamp: string = new Date().toISOString();
        const messageFormatted: string = `[${timestamp}] ${message}`;
        return messageFormatted;
    } 
}
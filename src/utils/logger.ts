export class Logger {
    constructor() {}

    static log(message: string): void {
        const timestamp: string = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    static error(message: string): void {
        const timestamp: string = new Date().toString();
        console.error(`[${timestamp}] ${message}`);
    }
}
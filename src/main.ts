import { EventTypes } from "./core/EventTypes.ts";
import { EventEmitterService } from "./services/EventEmitterService.ts";
import { FileService } from "./services/FileService.ts";
import { Logger } from "./utils/logger.ts";

function sum(data: number[]): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            Logger.log(`Processando dados: ${data}`);
            const sum: number = data.reduce((acc, curr) => acc + curr, 0);
            Logger.log(`Soma dos valores processados: ${sum}`)
        }, 3000);
    });
}

async function main() {
    const fileName: string = 'registro.txt';
    const service: FileService = new FileService('mensagens');
    await service.saveMessage(fileName, 'Olá, mundo!');
    await service.saveMessage(fileName, 'Nova mensagem registrada.')
    await service.showContent(fileName);

    const emitterService = new EventEmitterService();

    emitterService.eventOn(EventTypes.PROCESS_DATA, async (data: number[]) => {
        await sum(data);
    });

    emitterService.eventEmit(EventTypes.PROCESS_DATA, [1, 2, 3, 4]);
}

main();
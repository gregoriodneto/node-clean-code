import { EventEmitterCustom } from "./core/EventEmitterCustom.ts";
import { EventTypes } from "./core/EventTypes.ts";
import { TypeLogs } from "./infrastructure/domains/enums/TypeLogs.ts";
import { EventEmitterService } from "./services/EventEmitterService.ts";
import { FileService } from "./services/FileService.ts";
import { FileWatcherService } from "./services/FileWatcherService.ts";
import { HistoryService } from "./services/HistoryService.ts";
import { Logger } from "./utils/logger.ts";

function sum(data: number[]): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            Logger.log(`Processando dados: ${data}`);
            HistoryService.save(`Processando dados: ${data}`, TypeLogs.INFO, 'main');
            const sum: number = data.reduce((acc, curr) => acc + curr, 0);
            Logger.log(`Soma dos valores processados: ${sum}`);
            HistoryService.save(`Soma dos valores processados: ${sum}`, TypeLogs.INFO, 'main');
        }, 3000);
    });
}

async function main() {
    try {
        const fileName: string = 'registro.txt';
        const service: FileService = new FileService('mensagens');
        await service.saveMessage(fileName, 'Olá, mundo!');
        await service.saveMessage(fileName, 'Nova mensagem registrada.')
        await service.showContent(fileName);

        const emitter = EventEmitterCustom.emitter;

        const emitterService = new EventEmitterService(emitter);
        const watcher = new FileWatcherService('mensagens', emitter);
        watcher.startWatching();

        emitterService.eventOn(EventTypes.PROCESS_DATA, async (data: number[]) => {
            await sum(data);
        });

        emitterService.eventEmit(EventTypes.PROCESS_DATA, [1, 2, 3, 4]);

        setTimeout(() => {
            Logger.log('Encerrando o Watcher...')
            HistoryService.save('Encerrando o Watcher...', TypeLogs.INFO, 'main');
            process.exit(0);
        }, 10000);
    } catch (error) {
        Logger.error(`Erro no main: ${error}`);
        HistoryService.save(`Erro no main: ${error}`, TypeLogs.ERROR, 'seed');
    }
}

main();
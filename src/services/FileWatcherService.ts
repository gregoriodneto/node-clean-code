import { __dirname } from './../config/paths.ts';
import path from 'path';
import fs from 'fs';
import { EventTypes } from '../core/EventTypes.ts';
import EventEmitter from 'events';
import { Logger } from '../utils/logger.ts';

export class FileWatcherService {
    private emitter: EventEmitter;
    private dirToWatch: string;

    constructor(dir: string, emitter: EventEmitter) {
        this.dirToWatch = path.join(__dirname, '../../files', dir);
        this.emitter = emitter;
    }

    public startWatching() {
        fs.watch(this.dirToWatch, (eventType, filename) => {
            if (filename) {
                const fullPath = path.join(this.dirToWatch, filename);
                Logger.log(`[WATCHER] Evento: ${eventType} - Arquivo: ${filename}`);

                if (eventType === 'rename') {
                    if (fs.existsSync(fullPath)) {
                        Logger.log(`[WATCHER] Arquivo criado: ${filename}`);
                        this.emitter.emit(EventTypes.PROCESS_DATA, filename);
                    } else {
                        Logger.log(`[WATCHER] Arquivo removido: ${filename}`);
                    }
                } else if (eventType === 'change') {
                    Logger.log(`[WATCHER] Arquivo alterado: ${filename}`);
                    this.emitter.emit(EventTypes.PROCESS_DONE, filename);
                }
            }
        });
    }
}
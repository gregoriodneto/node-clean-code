import { EventEmitter } from 'events';
import { AppEvents } from './AppEvents.ts';
import { EventTypes } from './EventTypes.ts';

export class EventEmitterCustom {
    static #emitter: EventEmitter;
    constructor() {}

    public static get emitter(): EventEmitter {
        if (!EventEmitterCustom.#emitter) {
            EventEmitterCustom.#emitter = new EventEmitter();
        }
        return EventEmitterCustom.#emitter;
    }

    public static on<K extends EventTypes>(event: K, callback: (data: AppEvents[K]) => void): void {
        this.#emitter.on(event, callback);
    }

    public static emit<K extends EventTypes>(event: K, data: AppEvents[K]): void {
        this.#emitter.emit(event, data);
    }
}
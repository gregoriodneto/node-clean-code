import EventEmitter from "events";
import { AppEvents } from "../core/AppEvents.ts";

export class EventEmitterService {
    private emitter: EventEmitter;

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
    }

    eventEmit<K extends keyof AppEvents>(event: K, data: AppEvents[K]) {
        this.emitter.emit(event, data);
    }

    eventOn<K extends keyof AppEvents>(event: K, callback: (data: AppEvents[K]) => void) {
        this.emitter.on(event, callback);
    }
}
import EventEmitter from "events";
import { EventEmitterCustom } from "../core/EventEmitterCustom.ts";
import { AppEvents } from "../core/AppEvents.ts";

export class EventEmitterService {
    private emitter: EventEmitter;

    constructor() {
        this.emitter = EventEmitterCustom.emitter;
    }

    eventEmit<K extends keyof AppEvents>(event: K, data: AppEvents[K]) {
        this.emitter.emit(event, data);
    }

    eventOn<K extends keyof AppEvents>(event: K, callback: (data: AppEvents[K]) => void) {
        this.emitter.on(event, callback);
    }
}
import { EventTypes } from './EventTypes.ts';

export interface AppEvents {
    [EventTypes.PROCESS_DATA]: number[];
    [EventTypes.PROCESS_DONE]: number[];
    [EventTypes.ERROR]?: string;
}
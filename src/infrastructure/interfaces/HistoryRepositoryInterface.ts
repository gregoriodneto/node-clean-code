import { TypeLogs } from "../domains/enums/TypeLogs.ts";

export interface HistoryRepositoryInterface {
    save(message: string, type: TypeLogs, path?: string): Promise<void>;
}
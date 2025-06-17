import { Conn } from "../db/conn.ts";
import { TypeLogs } from "../domains/enums/TypeLogs.ts";
import { FileLog } from "../domains/FileLog.ts";
import { HistoryRepositoryInterface } from "../interfaces/HistoryRepositoryInterface.ts";

export class HistoryRepository implements HistoryRepositoryInterface {
    private static __instance: HistoryRepository;

    private constructor() {}

    public static get instance(): HistoryRepository {
        if (!HistoryRepository.__instance) {
            HistoryRepository.__instance = new HistoryRepository();
        }

        return HistoryRepository.__instance;
    }

    async save(message: string, type: TypeLogs, path?: string): Promise<void> {
        const log = new FileLog(message, type, path);
        const conn = await Conn.instance.conn();

        await conn.execute(
            `
                INSERT INTO file_log (message, type, path)
                VALUES (:message, :type, :path)
            `,
            [message, type, path],
            { autoCommit: true }
        )
    }

}
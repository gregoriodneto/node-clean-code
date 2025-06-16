import { DBConfig } from "./config.ts";

export class Conn {
    private static __instance: Conn;

    private constructor() {}

    public static get instance(): Conn {
        if (!Conn.__instance) {
            Conn.__instance = new Conn();
        }
        return Conn.__instance;
    }

    public async conn() {
        return await DBConfig.instance.getConnection();
    }

    public async close(): Promise<void> {
        await DBConfig.instance.closeConnection();
    }
}
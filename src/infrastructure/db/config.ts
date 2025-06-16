import oracledb from "oracledb";
import { ENV } from "../../config/env.ts";

export class DBConfig {
    private static __instance: DBConfig;
    private connection: oracledb.Connection | null = null;

    private constructor() {}

    public static get instance(): DBConfig {
        if (!DBConfig.__instance) {
            DBConfig.__instance = new DBConfig();
        }
        return DBConfig.__instance;
    }

    public async getConnection(): Promise<oracledb.Connection> {
        if (!this.connection) {
            this.connection = await oracledb.getConnection({
                user: ENV.APP_USER,
                password: ENV.APP_USER_PASSWORD,
                connectionString: ENV.CONNECTION_STRING
            });
        }
        return this.connection;
    }

    public async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
import { TypeLogs } from "./enums/TypeLogs.ts";

export class FileLog {
    private id?: number;
    private message: string;
    private type: TypeLogs;
    private path?: string;
    private createdAt?: Date;

    constructor(
        message: string,
        type: TypeLogs,
        path?: string,
        createdAt?: Date,
        id?: number
    ) {
        this.message = message;
        this.type = type;
        this.path = path;
        this.createdAt = createdAt ?? new Date();
        this.id = id;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getMessage(): string {
        return this.message;
    }

    public getType(): TypeLogs {
        return this.type;
    }

    public getPath(): string | undefined {
        return this.path;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public toObject() {
        return {
            id: this.id,
            message: this.message,
            type: this.type,
            path: this.path,
            createdAt: this.createdAt
        }
    }
}
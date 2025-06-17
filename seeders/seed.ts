import { TypeLogs } from '../src/infrastructure/domains/enums/TypeLogs.ts';
import { Conn } from './../src/infrastructure/db/conn.ts';
import { HistoryService } from './../src/services/HistoryService.ts';
import { Logger } from './../src/utils/logger.ts';

async function seed() {
    const conn = await Conn.instance.conn();

    try {
        // Criar tabela FileLog se não existir.
        await conn.execute(`
            BEGIN
                EXECUTE IMMEDIATE '
                    CREATE TABLE file_log(
                        id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                        message VARCHAR2(1000) NOT NULL,
                        type VARCHAR2(50) NOT NULL,
                        path VARCHAR2(1000),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ';
            EXCEPTION
                WHEN OTHERS THEN
                    IF SQLCODE != -955 THEN -- ORA-00955: name is already used by an existing object
                        RAISE;
                    END IF;
            END;
        `);

        Logger.log(`Seed executado com sucesso!`);
        HistoryService.save(`Seed executado com sucesso!`, TypeLogs.INFO, 'seed');
    } catch (error) {
        Logger.error(`Erro ao executar o seed: ${error}`);
        HistoryService.save(`Erro ao executar o seed: ${error}`, TypeLogs.ERROR, 'seed');
    } finally {
        await Conn.instance.close();
    }
}

seed();
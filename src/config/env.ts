import 'dotenv/config'

export const ENV = {
    FOLDER_NAME: process.env.FOLDER_NAME || 'mensagens',
    FOLDER_NAME_HISTORY: process.env.FOLDER_NAME_HISTORY || 'history',
    FILE_NAME_HISTORY: process.env.FOLDER_NAME_HISTORY || 'history.log',
    PORT: process.env.PORT || 3000,
    APP_USER: process.env.APP_USER || 'app',
    APP_USER_PASSWORD: process.env.APP_USER_PASSWORD || 'app',
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'localhost:1521/XEPDB1',
}
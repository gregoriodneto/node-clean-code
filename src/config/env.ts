import 'dotenv/config'

export const ENV = {
    FOLDER_NAME: process.env.FOLDER_NAME || 'mensagens',
    FOLDER_NAME_HISTORY: process.env.FOLDER_NAME_HISTORY || 'history',
    FILE_NAME_HISTORY: process.env.FOLDER_NAME_HISTORY || 'history.log',
    PORT: process.env.PORT || 3000,
}
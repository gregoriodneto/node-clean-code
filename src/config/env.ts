import 'dotenv/config'

export const ENV = {
    FOLDER_NAME: process.env.FOLDER_NAME || 'mensagens',
    PORT: process.env.PORT || 3000,
}
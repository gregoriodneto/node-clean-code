import express from 'express';
import fileRoutes from './routes/file.routes.ts'
import { ENV } from '../config/env.ts';
import { loggerMiddleware } from './middlewares/logger.middleware.ts';
import { Logger } from '../utils/logger.ts';


const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use('/api', fileRoutes);

app.listen(ENV.PORT, () => {
    Logger.log(`API rodando em http://localhost:${ENV.PORT}`);
});
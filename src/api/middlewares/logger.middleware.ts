import { NextFunction, Request, Response } from "express";
import { Logger } from "../../utils/logger.ts";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    Logger.log(`${req.method} ${req.url}`);
    next();
}
import express, { Application, Response, Request, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan"
import router from "./Routes/agents.routes";
import { AppError, HttpCode } from "./Utils/AppError";
import { ErrorHandler } from "./MiddleWares/ErrorHandling/ErrorHandler";

export const AppConfig = (app: Application) =>{
    // Configuring middlewares
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    // configuring my routes for my application
    app.use("/api/agents", router)

    app.all("*", (req: Request, res: Response, next: NextFunction) =>{
        next(
            new AppError({
                message: `This route ${req.originalUrl} does not exist`,
                httpCode: HttpCode.NOT_FOUND
            })
        )
    });

    app.use(ErrorHandler)
}
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan"

export const AppConfig = (app: Application) =>{
    // Configuring middlewares
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    // configuring my routes for my application
}
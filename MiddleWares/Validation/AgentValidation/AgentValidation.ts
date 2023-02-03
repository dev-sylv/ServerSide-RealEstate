import { NextFunction, Request, Response, RequestHandler } from "express";
import { validator } from "../Validator";
import { AgentSchemaValidation } from "./AgentSchema";

export const RegisterValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(AgentSchemaValidation.Register, req.body, next)
};

export const LoginValidation: RequestHandler = (
    req: Request, res: Response, next: NextFunction
) =>{
    validator(AgentSchemaValidation.Login, req.body, next)
}
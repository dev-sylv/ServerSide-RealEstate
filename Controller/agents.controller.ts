import {NextFunction, Request, Response} from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import AgentsModel from "../Models/agents.models";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../Utils/AppError";
import cloudinary from "../Config/Cloudinary";


// Register Agents:
export const RegisterAgents = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const { name, email, password, image, bio} = req.body;
        if (!req.body) {
            next(
                new AppError({
                    message: "Please fill in all fields",
                    httpCode: HttpCode.NO_CONTENT,
                    name: AppError.name,
                    isOperational: true
                })
            )
        }
        const saltedPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltedPassword);

        const cloud_Img = await cloudinary.uploader.upload(req?.file!.path);
        const agents = await AgentsModel.create({
            name,
            email,
            password: hashedPassword,
            image: cloud_Img.secure_url,
            bio,
        })

        if (!agents) {
            next(
                new AppError({
                    message: "Unable to create Agents",
                    httpCode: HttpCode.BAD_REQUEST,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.ACCEPTED).json({
            message: "Successfully created this agent",
            data: agents
        })
    }
);

// Login Agents: 
export const AgentsLogin = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const { email, password } = req.body;
        if (!email || !password) {
            next(
                new AppError({
                    message: "Empty fields",
                    httpCode: HttpCode.NO_CONTENT,
                    name: AppError.name
                })
            )
        }
        const agent = await AgentsModel.findOne({email});
        if (!agent) {
            next(
                new AppError({
                    message: "User does not exist",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        const checkPassword = await bcrypt.compare(password, agent!.password);
        if (!checkPassword) {
            next(
                new AppError({
                    message: "Either Email or Password is not correct",
                    httpCode: HttpCode.UNAUTHORIZED,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: `Welcome ${agent?.name}`
        })
    }
)

// Get All Agents:
export const GetAgents = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const agents = await AgentsModel.find().sort({createdAt: -1});
        if (!agents) {
            next(
                new AppError({
                    message: "No Agents found",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: "Successfully got all agents",
            data: agents
        })

    }
)

// Get one agents:
export const OneAgent = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const agent = await AgentsModel.findById(req.params.agentID);
        if (!agent) {
            next(
                new AppError({
                    message: "Agent not found",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: "Agent Found",
            data: agent
        })
    }
)

// Delete all agents:
export const DeleteAllAgents = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const agents = await AgentsModel.deleteMany();
        return res.status(HttpCode.OK).json({
            message: "Successfully deleted"
        })
    }
)
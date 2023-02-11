import HouseModels from "../Models/house.models";
import {NextFunction, Request, Response} from "express";
import { AsyncHandler } from "../Utils/AsyncHandler";
import AgentsModel from "../Models/agents.models";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../Utils/AppError";
import cloudinary from "../Config/Cloudinary";
import mongoose from "mongoose";

// Post Houses:
export const PostHouses = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const {houseName, houseDescription, housePrice, bedrooms, bathrooms, houseImage, houseRentage, houseLocation, agentname} = req.body;

        // const cloud_Img = await cloudinary.uploader.upload(req?.file!.path);

        const Agent = await AgentsModel.findById(req.params.agentID)

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
        const house = await HouseModels.create({
            houseName,
            houseDescription,
            housePrice,
            bedrooms,
            bathrooms,
            // houseImage: cloud_Img.secure_url,
            // houseImage,
            houseRentage,
            houseLocation,
            agentname: Agent?.name,
        })
        if (!house) {
            next(
                new AppError({
                    message: "Unable to post house",
                    httpCode: HttpCode.BAD_REQUEST,
                    name: AppError.name
                })
            )
        }
        Agent?.houses.push(new mongoose.Types.ObjectId(house._id));
        Agent?.save();

        return res.status(HttpCode.CREATED).json({
            message: "Sucessfully posted a house",
            data: house
        })
    }
)

// Get All Houses:
export const GetHouse = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const house = await AgentsModel.findById(req.params.agentID).populate({
            path: "houses"
        });
        if (!house) {
            next(
                new AppError({
                    message: "No house found",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: `Successfully got all houses posted by ${house?.name}`,
            data: house
        })

    }
)
export const getallhouse = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const house = await AgentsModel.find().populate({
            path: "houses"
        });
        if (!house) {
            next(
                new AppError({
                    message: "No house found",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: "Successfully got all houses",
            data: house
        })

    }
)

// Get One House:
export const OneHouse = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const house = await HouseModels.findById(req.params.houseID);
        if (!house) {
            next(
                new AppError({
                    message: "House not found",
                    httpCode: HttpCode.NOT_FOUND,
                    name: AppError.name
                })
            )
        }
        return res.status(HttpCode.FOUND).json({
            message: "House Found",
            data: house
        })
    }
)


// Delete all house:
export const DeleteAllHouse = AsyncHandler(
    async(req: Request, res: Response, next: NextFunction): Promise<Response> =>{
        const house = await HouseModels.deleteMany();
        return res.status(HttpCode.OK).json({
            message: "Successfully deleted"
        })
    }
)
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllHouse = exports.OneHouse = exports.GetHouse = exports.PostHouses = void 0;
const house_models_1 = __importDefault(require("../Models/house.models"));
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const agents_models_1 = __importDefault(require("../Models/agents.models"));
const AppError_1 = require("../Utils/AppError");
const Cloudinary_1 = __importDefault(require("../Config/Cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
// Post Houses:
exports.PostHouses = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { houseName, houseDescription, housePrice, bedrooms, bathrooms, houseImage, houseRentage, houseLocation, agentname } = req.body;
    const cloud_Img = yield Cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
    const Agent = yield agents_models_1.default.findById(req.params.agentID);
    if (!req.body) {
        next(new AppError_1.AppError({
            message: "Please fill in all fields",
            httpCode: AppError_1.HttpCode.NO_CONTENT,
            name: AppError_1.AppError.name,
            isOperational: true
        }));
    }
    const house = yield house_models_1.default.create({
        houseName,
        houseDescription,
        housePrice,
        bedrooms,
        bathrooms,
        houseImage: cloud_Img.secure_url,
        // houseImage,
        houseRentage,
        houseLocation,
        agentname: Agent === null || Agent === void 0 ? void 0 : Agent.name,
    });
    if (!house) {
        next(new AppError_1.AppError({
            message: "Unable to post house",
            httpCode: AppError_1.HttpCode.BAD_REQUEST,
            name: AppError_1.AppError.name
        }));
    }
    Agent === null || Agent === void 0 ? void 0 : Agent.houses.push(new mongoose_1.default.Types.ObjectId(house._id));
    Agent === null || Agent === void 0 ? void 0 : Agent.save();
    return res.status(AppError_1.HttpCode.CREATED).json({
        message: "Sucessfully posted a house",
        data: house
    });
}));
// Get All Houses:
exports.GetHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield agents_models_1.default.findById(req.params.agentID).populate({
        path: "houses"
    });
    if (!house) {
        next(new AppError_1.AppError({
            message: "No house found",
            httpCode: AppError_1.HttpCode.NOT_FOUND,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.FOUND).json({
        message: "Successfully got all agents",
        data: house
    });
}));
// Get One House:
exports.OneHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield house_models_1.default.findById(req.params.houseID);
    if (!house) {
        next(new AppError_1.AppError({
            message: "House not found",
            httpCode: AppError_1.HttpCode.NOT_FOUND,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.FOUND).json({
        message: "House Found",
        data: house
    });
}));
// Delete all house:
exports.DeleteAllHouse = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield house_models_1.default.deleteMany();
    return res.status(AppError_1.HttpCode.OK).json({
        message: "Successfully deleted"
    });
}));

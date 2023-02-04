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
exports.DeleteAllAgents = exports.OneAgent = exports.GetAgents = exports.AgentsLogin = exports.RegisterAgents = void 0;
const AsyncHandler_1 = require("../Utils/AsyncHandler");
const agents_models_1 = __importDefault(require("../Models/agents.models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../Utils/AppError");
const Cloudinary_1 = __importDefault(require("../Config/Cloudinary"));
// Register Agents:
exports.RegisterAgents = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, image, bio } = req.body;
    if (!req.body) {
        next(new AppError_1.AppError({
            message: "Please fill in all fields",
            httpCode: AppError_1.HttpCode.NO_CONTENT,
            name: AppError_1.AppError.name,
            isOperational: true
        }));
    }
    const saltedPassword = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, saltedPassword);
    const cloud_Img = yield Cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
    const agents = yield agents_models_1.default.create({
        name,
        email,
        password: hashedPassword,
        image: cloud_Img.secure_url,
        bio,
    });
    if (!agents) {
        next(new AppError_1.AppError({
            message: "Unable to create Agents",
            httpCode: AppError_1.HttpCode.BAD_REQUEST,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.ACCEPTED).json({
        message: "Successfully created this agent",
        data: agents
    });
}));
// Login Agents: 
exports.AgentsLogin = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new AppError_1.AppError({
            message: "Empty fields",
            httpCode: AppError_1.HttpCode.NO_CONTENT,
            name: AppError_1.AppError.name
        }));
    }
    const agent = yield agents_models_1.default.findOne({ email });
    if (!agent) {
        next(new AppError_1.AppError({
            message: "User does not exist",
            httpCode: AppError_1.HttpCode.NOT_FOUND,
            name: AppError_1.AppError.name
        }));
    }
    const checkPassword = yield bcrypt_1.default.compare(password, agent.password);
    if (!checkPassword) {
        next(new AppError_1.AppError({
            message: "Either Email or Password is not correct",
            httpCode: AppError_1.HttpCode.UNAUTHORIZED,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.FOUND).json({
        message: `Welcome ${agent === null || agent === void 0 ? void 0 : agent.name}`
    });
}));
// Get All Agents:
exports.GetAgents = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agents = yield agents_models_1.default.find().sort({ createdAt: -1 });
    if (!agents) {
        next(new AppError_1.AppError({
            message: "No Agents found",
            httpCode: AppError_1.HttpCode.NOT_FOUND,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.FOUND).json({
        message: "Successfully got all agents",
        data: agents
    });
}));
// Get one agents:
exports.OneAgent = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield agents_models_1.default.findById(req.params.agentID);
    if (!agent) {
        next(new AppError_1.AppError({
            message: "Agent not found",
            httpCode: AppError_1.HttpCode.NOT_FOUND,
            name: AppError_1.AppError.name
        }));
    }
    return res.status(AppError_1.HttpCode.FOUND).json({
        message: "Agent Found",
        data: agent
    });
}));
// Delete all agents:
exports.DeleteAllAgents = (0, AsyncHandler_1.AsyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const agents = yield agents_models_1.default.deleteMany();
    return res.status(AppError_1.HttpCode.OK).json({
        message: "Successfully deleted"
    });
}));

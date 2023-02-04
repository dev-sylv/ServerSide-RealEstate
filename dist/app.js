"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const agents_routes_1 = __importDefault(require("./Routes/agents.routes"));
const house_routes_1 = __importDefault(require("./Routes/house.routes"));
const AppConfig = (app) => {
    // Configuring middlewares
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    // configuring my routes for my application
    app.use("/api/agents", agents_routes_1.default);
    app.use("/api/houses", house_routes_1.default);
    // app.all("*", (req: Request, res: Response, next: NextFunction) =>{
    //     next(
    //         new AppError({
    //             message: `This route ${req.originalUrl} does not exist`,
    //             httpCode: HttpCode.NOT_FOUND
    //         })
    //     )
    // });
    // app.use(ErrorHandler)
};
exports.AppConfig = AppConfig;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// VALIDATION SCHEMA OBJECT
exports.AgentSchemaValidation = ({
    Register: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required()
    }),
    Login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
    })
});

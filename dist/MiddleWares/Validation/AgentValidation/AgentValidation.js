"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidation = exports.RegisterValidation = void 0;
const Validator_1 = require("../Validator");
const AgentSchema_1 = require("./AgentSchema");
const RegisterValidation = (req, res, next) => {
    (0, Validator_1.validator)(AgentSchema_1.AgentSchemaValidation.Register, req.body, next);
};
exports.RegisterValidation = RegisterValidation;
const LoginValidation = (req, res, next) => {
    (0, Validator_1.validator)(AgentSchema_1.AgentSchemaValidation.Login, req.body, next);
};
exports.LoginValidation = LoginValidation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const AppError_1 = require("../../Utils/AppError");
const validator = (schemaName, body, next) => {
    const value = schemaName.validate(body, {
        allowUnknown: true,
        abortEarly: false,
        stripUnknown: true,
    });
    try {
        value.error ? next(new AppError_1.AppError({
            httpCode: AppError_1.HttpCode.UNPROCESSABLE_IDENTITY,
            message: value.error.details[0].message,
        })) : next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.validator = validator;

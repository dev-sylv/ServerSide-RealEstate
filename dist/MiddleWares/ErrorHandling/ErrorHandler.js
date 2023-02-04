"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const DevErrorHandler = (err, res) => {
    return res.status(err.httpCode).json({
        httpCode: err.httpCode,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const ErrorHandler = (err, req, res, next) => {
    DevErrorHandler(err, res);
};
exports.ErrorHandler = ErrorHandler;

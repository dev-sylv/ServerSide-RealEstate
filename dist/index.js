"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const DB_1 = require("./Config/DB");
const port = 2080 || process.env.port;
dotenv_1.default.config();
// const port = environmentVariables.PORT
const app = (0, express_1.default)();
(0, app_1.AppConfig)(app);
(0, DB_1.DBconnect)();
app.listen(port, () => {
    console.log("");
    console.log("Server is up and running on port", port);
});

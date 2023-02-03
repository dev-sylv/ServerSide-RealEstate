import express, { Application, Request, Response} from "express";
import { environmentVariables } from "./Config/environmentVariables";

import dotenv from "dotenv";
import { AppConfig } from "./app";
import { DBconnect } from "./Config/DB";

const port = 2080;

dotenv.config();

// const port = environmentVariables.PORT

const app : Application = express();

AppConfig(app);
DBconnect();

app.listen(port, () =>{
    console.log("")
    console.log("Server is up and running on port", port)
})


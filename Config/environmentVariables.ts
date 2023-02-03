import dotenv from "dotenv";

dotenv.config(); 

export const environmentVariables = {
    PORT: process.env.port as string,
}
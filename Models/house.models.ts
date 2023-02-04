import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { agentData, houseData } from "./AllInterface";

interface Houses extends Document, houseData{};

const AgentSchema: Schema<Houses> = new Schema({})
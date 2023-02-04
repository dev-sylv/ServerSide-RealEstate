import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { agentData } from "./AllInterface";

interface Agents extends Document, agentData{};

const AgentSchema: Schema<Agents> = new Schema({})
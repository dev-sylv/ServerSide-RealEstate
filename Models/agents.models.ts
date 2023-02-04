import mongoose,{ model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { agentData } from "./AllInterface";

interface Agents extends Document, agentData{};

const AgentSchema: Schema<Agents> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a strong password"],
        minlength: 8,
    },
    bio: {
        type: String,
        default: "I am an Agent and i sell afordable houses and lands",
        trim:  true
    },
    image: {
        type: String,
        required: [true, "Please enter your image for identification"],
    },
    houses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HouseCollections"
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

const AgentsModel = model<Agents>("AgentsCollection", AgentSchema);

export default AgentsModel;
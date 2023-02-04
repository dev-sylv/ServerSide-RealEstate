import { model, Schema, Document } from "mongoose";
import { houseData } from "./AllInterface";

interface Houses extends Document, houseData{};

const HouseSchema: Schema<Houses> = new Schema({
    houseName: {
        type: String,
        required: [true, "Please enter a House Name"],
        trim: true,
    },
    houseDescription: {
        type: String,
        required: [true, "Please enter the House Description"],
        trim: true,
    },
    housePrice: {
        type: String,
        required: [true, "Please enter the House Price"],
        trim: true,
    },
    bedrooms: {
        type: String,
        required: [true, "Please enter the number of bedrooms"],
        trim: true,
    },
    bathrooms: {
        type: String,
        required: [true, "Please enter the number of bathrooms"],
        trim: true,
    },
    houseImage: {
        type: String,
        // required: [true, "Please enter a House Image"],
        trim: true,
    },
    houseRentage: {
        type: String,
        required: [true, "Please enter a House Type e.g Rent or sale"],
        trim: true,
    },
    houseLocation: {
        type: String,
        required: [true, "Please enter the house Location"],
        trim: true,
    },
    agentname: {
        type: String,
        required: [true, "Please enter the agent that's posting the house"],
        trim: true
    }
});

const HouseModels = model<Houses>("HouseCollections", HouseSchema);

export default HouseModels;
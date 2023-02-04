"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const HouseSchema = new mongoose_1.Schema({
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
        type: String
    }
});
const HouseModels = (0, mongoose_1.model)("HouseCollections", HouseSchema);
exports.default = HouseModels;

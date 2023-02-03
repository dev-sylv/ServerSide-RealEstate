import mongoose from "mongoose";

const DB_URL = "mongodb://localhost/Bootcamp-RealEstate"

export const DBconnect = async() =>{
    try {
        const connect = await mongoose.connect(DB_URL);
        console.log(`Database is connected to ${connect.connection.host}`)
    } catch (error) {
        console.log("An error occured in connecting database")
    }
}
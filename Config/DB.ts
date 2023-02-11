import mongoose from "mongoose";

const DB_URL = "mongodb+srv://sylviaDB:devsylvia@cluster0.fhx2vt1.mongodb.net/REALESTATEPROJECT?retryWrites=true&w=majority"

const Local_URI = "mongodb://localhost/REALESTATEPROJECT"

export const DBconnect = async() =>{
    try {
        const connect = await mongoose.connect(Local_URI);
        console.log(`Database is connected to ${connect.connection.host}`)
    } catch (error) {
        console.log("An error occured in connecting database", error)
    }
}
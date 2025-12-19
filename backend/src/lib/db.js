import mongoose from "mongoose";
import { ENV } from "./env.js";


export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(ENV.MONGODB_URL)
        console.log("MongoDB conntected: ", conn.connection.host)
    }catch(error){
        console.error('Error connecting to MONGODB: ', error)
        process.exit(1);
    }
}
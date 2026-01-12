import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connectMongoDB = async ()=>{
    try {
        const mongoDBInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected succesfully !! DB HOST = ${mongoDBInstance.connection.host}\n`)
    } catch (error) {
        console.log("MongoDB Connection Failed \n", error);
        process.exit(1)
    }
}

export { connectMongoDB }
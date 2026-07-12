import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectMongoDB = async () => {
    try {
        const mongoDBInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected successfully !! DB HOST = ${mongoDBInstance.connection.host}\n`);
    } catch (error) {
        console.log("MongoDB Connection Failed \n", error);
        process.exit(1);
    }
}

export { connectMongoDB };



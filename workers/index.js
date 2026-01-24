import "./video.worker.js"
import { connectRedis } from "../utils/redis.js"
import { connectMongoDB } from "../db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

connectMongoDB()
.then(()=>{
    console.log('Worker: MongoDB connected')
})
.catch((error)=>{
    console.error('Worker: MongoDB connection error:', error)
})

connectRedis()

console.log('Worker process started');
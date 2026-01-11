import express from "express"
import cors from "cors"
import { Client } from "./redisClient.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

Client.on('error', (err) => console.log('Redis Client Error', err));

export {app}
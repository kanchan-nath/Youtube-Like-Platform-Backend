import express, { Router } from "express"
import cors from "cors"
// import { Client } from "./redisClient.js"
import {limiter} from "./middlewares/rateLimiter.js"
import helmet from "helmet"
import compression from "compression"
// import { Router } from "express"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Client.on('error', (err) => console.log('Redis Client Error', err));

app.use(limiter)
app.use(helmet)
app.use(compression())


export {app}
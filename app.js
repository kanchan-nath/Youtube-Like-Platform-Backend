import express, { Router } from "express"
import cors from "cors"
// import { Client } from "./redisClient.js"
import {limiter} from "./middlewares/rateLimiter.middleware.js"
import helmet from "helmet"
import compression from "compression"
// import { Router } from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser())
// Client.on('error', (err) => console.log('Redis Client Error', err));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// app.use(limiter)
// app.use(helmet())
// app.use(compression())

import userRouter from "../src/routes/user.route.js"
import otpRouter from "../src/routes/emailOTP.route.js"
app.use("/api/v1/auth", userRouter )
app.use("/api/v1/auth", otpRouter)

export {app}
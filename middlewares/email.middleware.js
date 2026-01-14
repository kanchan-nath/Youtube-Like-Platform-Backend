import nodemailer from "nodemailer"
import { asyncHandeler } from "../utils/asyncHandeler.js"
import { EmailOTPVerification } from "../models/emailOtpVerification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: "smtp.gmail.com",
    port: 587, 
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})

const emailOTPVerification = asyncHandeler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "All fields are required")
    }

    const generateOtp = Math.floor(10000000 + Math.random() * 90000000).toString()

    const dbOTPSave = await EmailOTPVerification.create({
        cachedOTP: generateOtp,
        email: email
    })

    const OTPResponse = await transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${generateOtp}`,
        html: `<b>Your OTP is: ${generateOtp}</b>`,
    })

    return res
    .status(200)
    .json(new ApiResponse(200, OTPResponse, "OTP Sent Successfully"))
})

export { emailOTPVerification }
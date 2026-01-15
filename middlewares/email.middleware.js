import nodemailer from "nodemailer"
import { asyncHandeler } from "../utils/asyncHandeler.js"
import { EmailOTPVerification } from "../models/emailOtpVerification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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

const sendOTPToEmail = asyncHandeler(async (req, res) => {
    const {email} = req.body

    if (!email) {
        throw new ApiError(400, "Email is not found")
    }

    const generateOtp = Math.floor(10000000 + Math.random() * 90000000).toString()

    const dbOTPSave = await EmailOTPVerification.create({
        cachedOTP: generateOtp,
        email: email,
    })

    const OTPResponse = await transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your OTP",
        text: `Your OTP is: ${generateOtp}`,
        html: `<b>Your OTP is: ${generateOtp}</b>`,
    })

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP Sent to Email Successfully"))
})

const verifyOTP = asyncHandeler(async(req, res) =>{
    const {email, OTPFromUser} = req.body

    if (!email || !OTPFromUser){
        throw new ApiError(400, "All fields are required")
    }

    const getOTPFromDB = await EmailOTPVerification.findOne(
        {
            email: email,
        }
    )
    const OTPFromDB = getOTPFromDB.cachedOTP

    if(OTPFromDB != OTPFromUser){
        throw new ApiError(400, "OTP is not matched")
    }
    
    await User.findOneAndUpdate({
        email: email,
        isVerified: true
    },
    { new: true }
    )

    await EmailOTPVerification.findOneAndDelete({email:email})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Otp Verified"))
})

export { sendOTPToEmail, verifyOTP }
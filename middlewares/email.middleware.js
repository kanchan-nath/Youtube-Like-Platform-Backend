import nodemailer from "nodemailer"
import { asyncHandeler } from "../utils/asyncHandeler.js"
import { EmailOTPVerification } from "../models/emailOtpVerification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { welcomeMsg } from "../config/welcome.config.js"

const transporter = nodemailer.createTransport({
    service: process.env.AUTH_SERVICE, 
    host: process.env.SERVER_HOST,
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

    const user = await User.findOne({email: email})

    if(!user){
        throw new ApiError(400, "User not found")
    }

    if(user.isVerified){
        throw new ApiError(200, "Email already verified")
    }

    const getOTPFromDB = await EmailOTPVerification.findOne({email: email})
    const OTPFromDB = getOTPFromDB.cachedOTP

    if(OTPFromDB != OTPFromUser){
        throw new ApiError(400, "Invalid OTP")
    }
    
    user.isVerified = true
    await user.save()

    
    await EmailOTPVerification.findOneAndDelete({email:email})
    
    if (user.isVerified) {
        await welcomeMsg(user.email, user.userName)
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email is verified, now you can log in!"))
})

const resendOTP = asyncHandeler(async(req,res) =>{
    const {email} = req.body

    const generateOtp = Math.floor(10000000 + Math.random() * 90000000).toString()

    
    transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your OTP",
        text: `Your OTP is: ${generateOtp}`,
        html: `<b>Your OTP is: ${generateOtp}</b>`,
    })

    const dbEmailOTP = await EmailOTPVerification.findOneAndUpdate(
        {
            email:email
        },
        {
            cachedOTP: generateOtp
        },
        {new: true}
    )

    if (!dbEmailOTP){
        throw new ApiError(400, "email is not found")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Otp Resend Succesfully"))
})

export { sendOTPToEmail, verifyOTP, resendOTP }
import mongoose from "mongoose";

const emailOTPVerificationSchema = new mongoose.Schema({
    cachedOTP:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    expiresAt:{
        type:Date,
        default: Date.now,
        expires: 100,
    }
},{timestamps:true})

export const EmailOTPVerification = new mongoose.model("EmailOTPVerification", emailOTPVerificationSchema)
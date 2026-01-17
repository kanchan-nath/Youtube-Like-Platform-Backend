import mongoose from "mongoose";
import bcrypt  from "bcryptjs";
const emailOTPVerificationSchema = new mongoose.Schema({
    cachedOTP:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    // expiresAt:{
    //     type:Date,
    //     default: Date.now,
    //     expires: 100000,
    // }
},{timestamps:true})

emailOTPVerificationSchema.pre("save", async function (next){
    if (!this.cachedOTP.isModified("cachedOTP")) return next()
    bcrypt.hash(this.cachedOTP, process.env.SALT_ROUND)
    next()
})

export const EmailOTPVerification = new mongoose.model("EmailOTPVerification", emailOTPVerificationSchema)
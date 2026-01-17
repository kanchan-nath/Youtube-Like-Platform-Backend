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
    if (!this.isModified("cachedOTP")) return next()
    bcrypt.hash(this.cachedOTP, 10)
})

emailOTPVerificationSchema.methods.isOTPCorrect = async function (OTPFromUser){
    return await bcrypt.compare(OTPFromUser, this.cachedOTP)
}

export const EmailOTPVerification = new mongoose.model("EmailOTPVerification", emailOTPVerificationSchema)
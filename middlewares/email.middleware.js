import nodemailor from "nodemailer"
import { asyncHandeler } from "../utils/asyncHandeler"

nodemailor.createTransport({
    host: "smtp.gmail.com",
    auth:{
        user: "kanchan.nath.act@gmail.com",
        pass: process.env.PASS,
    }
})

const emailOTPVerification = asyncHandeler(async(req, res) =>{
    await transporter.sendMail({
        from: '"OTP Verification" <kanchan.nath.act@gmail.com>',
        to: "bar@example.com, baz@example.com",
        subject: "OTP Verification",
        text: "Welcome to Youtube like Platform", 
        html: "<b>Hello world?</b>", 
    })
})

export {emailOTPVerification}
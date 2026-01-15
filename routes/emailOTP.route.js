import { Router } from "express";
import { sendOTPToEmail, verifyOTP, resendOTP } from "../middlewares/email.middleware.js";

const router = Router()

router.route("/send-otp").post(sendOTPToEmail)
router.route("/verify-otp").post(verifyOTP)
router.route("/resend-otp").post(resendOTP)


export default router
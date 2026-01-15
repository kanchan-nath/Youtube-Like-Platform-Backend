import { Router } from "express";
import { sendOTPToEmail, verifyOTP } from "../middlewares/email.middleware.js";

const router = Router()

router.route("/send-otp").post(sendOTPToEmail)
router.route("/verify-otp").post(verifyOTP)

export default router
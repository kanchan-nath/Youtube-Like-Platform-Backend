import { Router } from "express";
import { emailOTPVerification } from "../middlewares/email.middleware.js";

const router = Router()

router.route("/verify-otp").post(emailOTPVerification)

export default router
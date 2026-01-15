import {
    registerUser,
} from "../controllers/user.controller.js"
import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
// import {emailOTPVerification} from "../middlewares/email.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
// router.route("/otp/verify").post(emailOTPVerification)

export default router
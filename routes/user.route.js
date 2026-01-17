import {
    registerUser,
    logInUser,
    logOutUser,
    refreshAccessToken,

} from "../controllers/user.controller.js"
import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
// import {emailOTPVerification} from "../middlewares/email.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"
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
router.route("/login").post(logInUser)
router.route("/logout").post(verifyJWT, logOutUser,
)
router.route("/refresh-token").post(refreshAccessToken)



export default router
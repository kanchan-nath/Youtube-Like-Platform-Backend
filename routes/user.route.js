import {
    registerUser,
    logInUser,
    logOutUser,
    refreshAccessToken,
    resetPassword,
    getUserProfile,
    updateUserProfile,
    updateUserFiles,
    accountDelete

} from "../controllers/user.controller.js"
import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
// import {emailOTPVerification} from "../middlewares/email.middleware.js"
import { deviceInformation } from "../middlewares/deviceInformation.middleware.js"
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
router.route("/login").post(deviceInformation, logInUser)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/reset-password").post(verifyJWT, resetPassword)
router.route("/get-user-profile").get(verifyJWT, getUserProfile)
router.route("/update-user-profile").patch(verifyJWT, upload.none(),  updateUserProfile)
router.route("/update-user-profile-files").patch(verifyJWT, 
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
    updateUserFiles
)
router.route("/delete").delete(verifyJWT, accountDelete)


export default router
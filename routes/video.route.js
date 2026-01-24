import { Router } from "express"
import {
    uploadVideo,
    getVideos,
    deleteVideo,
    getVideoDetails,
    updateVideoDetails,
}  from "../controllers/video.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/upload").post(verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    uploadVideo)
router.route("/delete").delete(verifyJWT, deleteVideo)
router.route("/get-videos").get(verifyJWT, getVideos)
router.route("/videos/:videoId").get(verifyJWT, getVideoDetails)
router.route("/update").patch(verifyJWT, updateVideoDetails)
export default router
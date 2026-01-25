import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import {
    toggleLikeVideo,
    toggleLikeComment,
    toggleLikeChat,
    toggleLikePlaylist

} from "../controllers/like.controller.js"
const router = Router()

router.route("/video/:videoId").post(verifyJWT, toggleLikeVideo )
router.route("/comment/:commentId").post(verifyJWT, toggleLikeComment)
router.route("/chat/:chatId").post(verifyJWT, toggleLikeChat)
router.route("/playlist/:playlistId").post(verifyJWT, toggleLikePlaylist)


export default router

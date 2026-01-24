import {
    createComment,
    getComments,
    updateComment,
    deleteComemnt
} from "../controllers/comment.controller.js"
import { Router } from "express"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/:videoId/comments").post(verifyJWT, createComment)
router.route("/video/:videoId").get(verifyJWT, getComments )
router.route("/:commentId").patch(verifyJWT, updateComment)
router.route("/:commentId").delete(verifyJWT, deleteComemnt)

export default router
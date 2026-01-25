import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { 
    createPlaylist,
    addVideoToPlaylist,
    getPlaylist,
    getPlaylistDetails,
    removeVideoFromPlaylist,
    deletePlaylist
} from "../controllers/playlist.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(
    verifyJWT,
    upload.fields([
        { name: "playlistCoverImage", maxCount: 1 }
    ]),
    createPlaylist
);
router.route("/:playlistId/add-video/:videoId").post(verifyJWT, addVideoToPlaylist)
router.route("/get-playlist").get(verifyJWT, getPlaylist)
router.route("/:playlistId").post(verifyJWT, getPlaylistDetails)
router.route("/:playlistId/remove/:videoId").post(verifyJWT, removeVideoFromPlaylist)
router.route("/remove/:playlistId/").post(verifyJWT, deletePlaylist)



export default router;

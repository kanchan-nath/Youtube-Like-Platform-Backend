import multer from "multer";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
    selectPlan
} from "../controllers/plan.controller.js";

const router = Router();

router.route("/select-plan").post(verifyJWT, upload.fields([]), selectPlan)


export default router
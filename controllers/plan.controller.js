import { ApiError } from "../utils/ApiError.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import multer from "multer";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Plan } from "../models/plan.model.js";

const selectPlan = asyncHandeler(async(req, res)=>{
    const { planName, planPrice } = req.body

    const plan = await Plan.create({
        planName,
        planPrice,
        owner: req.user?._id,
        features:"Jello"
    })

    return res
    .status(200)
    .json(200, plan, "Plan selected")
})

export {
    selectPlan
}
import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asyncHandeler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";

const registerUser = asyncHandeler(async (req, res) =>{
    const {
        userName,
        email,
        fullName,
        password,
        age,

    } = req.body

    if(!userName || !email || !fullName || !password || !age ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })

    console.log("Hi",existedUser)
})

export {
    registerUser,
}
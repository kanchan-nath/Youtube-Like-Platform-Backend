import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asyncHandeler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import {cloudinaryUpload} from "../utils/cloudinary.js"

const registerUser = asyncHandeler(async (req, res) =>{
    const {userName, email, fullName, password, age, otp} = req.body

    if(!userName || !email || !fullName || !password || !age || !otp ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new ApiError(400, "User already registered with username or email")
    }

    const avatarLocalFilePath = req.files?.avatar[0]?.path
    const coverImageLocalFilePath = req.files?.coverImage[0]?.path
    
    const avatar = await cloudinaryUpload(avatarLocalFilePath)
    const coverImage = await cloudinaryUpload(coverImageLocalFilePath)

    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        age,
        password,
        avatar: avatar?.url,
        coverImage: coverImage?.url
    })

    return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered succesfully !"))

})

export {
    registerUser,
}
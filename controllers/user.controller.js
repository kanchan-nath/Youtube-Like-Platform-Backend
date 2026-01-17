import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asyncHandeler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import {cloudinaryUpload} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = asyncHandeler(async(userId) =>{
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken

    user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
})

const registerUser = asyncHandeler(async (req, res) =>{
    const {userName, email, fullName, password, age} = req.body

    if(!userName || !email || !fullName || !password || !age ){
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
    .json(new ApiResponse(200, user, "Otp Send to email!"))

})

const logInUser = asyncHandeler(async(req,res) =>{
    const {userName, email, password} = req.body

    if(!userName && !email && !password){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({
        $or:[{userName}, {email}]
    })


})

const forgetPassword = asyncHandeler(async(req, res) =>{
    const {email} = req.body
    
    if(!email){
        throw new ApiError(400, "Email is required")
    }
     
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Plzz check your email for change password"))
})

export {
    registerUser,
}
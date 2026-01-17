import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asyncHandeler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import {cloudinaryUpload} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import {sendDeviceInformation} from "../config/welcomeLogin.config.js"

const generateAccessAndRefreshTokens = async (userId) => {
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
}


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


    if(!user){
        throw new ApiError(400, "user doesn't exit")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid){
        throw new ApiError(400, "Password is incorrect")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const {accessToken, refreshToken} = generateAccessAndRefreshTokens(user._id)

    const {
        browserName,
        browserVersion,
        osName,
        osVersion,
        deviceType,
        ip,
        timestamp
    } = req.deviceInfo

    await sendDeviceInformation(
        loggedInUser.email,
        browserName,
        browserVersion,
        osName,
        osVersion,
        deviceType,
        ip,
        timestamp,
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "Uesr logged in Successfully"
    ))

})

const logOutUser = asyncHandeler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandeler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

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
    logInUser,
    logOutUser,
    refreshAccessToken,
}
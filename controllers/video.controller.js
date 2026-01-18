import { asyncHandeler } from "../utils/asyncHandeler.js";
import {ApiError} from "../utils/ApiError.js"
import { Video } from "../models/video.model.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const uploadVideo = asyncHandeler(async(req, res)=>{
    const { title, videoDescription, tag, genre } = req.body

    if(!title){
        throw new ApiError(400, "Title is required")
    }

    const videoLocalFilePath = req.files?.videoFile[0]?.path
    const thumbnailLocalFilePath = req.files?.thumbnail[0]?.path


    const videoFile = await cloudinaryUpload(videoLocalFilePath)
    const thumbnail = await cloudinaryUpload(thumbnailLocalFilePath)

    const video = await Video.create({
        title: title,
        videoDescription: videoDescription,
        videoFile: videoFile?.url,
        thumbnail: thumbnail?.url,
        tag: tag,
        genre: genre,
        owner: req.user?._id,
        
    })
    video.isPublished = true
    await video.save()

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"))

    
})

export {
    uploadVideo,
}
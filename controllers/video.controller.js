import { asyncHandeler } from "../utils/asyncHandeler.js";
import {ApiError} from "../utils/ApiError.js"
import { Video } from "../models/video.model.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";
import { videoQueue } from "../queues/video.queue.js";

const uploadVideo = asyncHandeler( async(req, res)=>{
    const { title, videoDescription, tag, genre } = req.body

    if(!title){
        throw new ApiError(400, "Title is required")
    }
    const videoLocalFilePath = req.files?.videoFile?.[0]?.path
    const thumbnailLocalFilePath = req.files?.thumbnail?.[0]?.path


    // const videoFile = await cloudinaryUpload(videoLocalFilePath)
    const thumbnail = await cloudinaryUpload(thumbnailLocalFilePath)

    const video = await Video.create({
        title: title,
        videoDescription: videoDescription,
        videoFile: "",
        thumbnail: thumbnail?.url,
        tag: tag,
        genre: genre,
        owner: req.user?._id,
        
    })
    // video.isPublished = true
    // await video.save()

    videoQueue.add({
        vidoeId: video._id,
        videoLocalFilePath: videoLocalFilePath,
        title: title,
        userId: req.user?._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video upload initiated, processing in background"))

    
})

const deleteVideo = asyncHandeler(async(req, res)=>{
    const { videoId } = req.params

    const deletedVideo = await Video.deleteOne({ videoId });

    if(!deleteVideo){
        throw new ApiError(400, "Video not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, deleteVideo, "Video Deleted Succesfully"))
})

const updateVideoDetails = asyncHandeler(async(req, res)=>{
    const { title, videoDescription, tag, genre } = req.body
    const { videoId } = req.params; 

    const video = await Video.findById( videoId )
    
})

export {
    uploadVideo,
    deleteVideo
}
import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asyncHandeler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Like} from "../models/like.model.js"

const toggleLikeVideo = asyncHandeler(async(req, res)=>{
    const {videoId} = req.params

    if(!videoId){
        throw new ApiError(400, "enter the video id")
    }

    const existingLike = await Like.findOne(
        {
            video:videoId,
            owner: req.user?._id
        }
    )

    if(existingLike){
        const disliked = await Like.findOneAndDelete(
            {
                video: videoId,
                owner: req.user?._id
            }
        )

        return res
        .status(200)
        .json(new ApiResponse(200, disliked, "Unliked the video"))
    }

    const liked = await Like.create({
        video: videoId,
        owner: req.user?._id
    })


    return res
    .status(200)
    .json(new ApiResponse(200, liked, "video liked"))

    
})

const toggleLikeComment = asyncHandeler(async(req, res)=>{
    const {commentId} = req.params
    
    if(!commentId){
        throw new ApiError(400, "Comment id required")
    }

    const existingCommentLiked = await Like.findOne(
        {
            comment: commentId,
            owner: req.user?._id
        }
    )

    if (existingCommentLiked){
        const disliked = await Like.findOneAndDelete({
            comment: commentId,
            owner: req.user?._id
        })

        return res
        .status(200)
        .json(new ApiResponse(200, disliked, "Disliked the comment"))
    }

   const liked =  await Like.create({
        comment: commentId,
        owner:req.user?._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200, liked, "Liked the comment"))
})

const toggleLikeChat = asyncHandeler(async(req, res)=>{
    //TODO: after create chat controller
})

const toggleLikePlaylist = asyncHandeler(async (req, res) => {
    //TODO: after create playlist controller
})
export {
    toggleLikeVideo,
    toggleLikeComment,
    toggleLikeChat,
    toggleLikePlaylist
}
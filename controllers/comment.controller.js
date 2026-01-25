import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"

const createComment = asyncHandeler(async(req, res)=>{
    const { commentContent } = req.body
    const {videoId} = req.params

    if (!commentContent || !videoId){
        throw new ApiError(400, "A;; fields are required")
    }

    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(400, "Video not found")
    }

    const comment = await Comment.create({
        commentContent,
        videoId:videoId,
        owner: req.user?._id,
    })


    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment successfully"))
})

const getComments = asyncHandeler(async(req, res)=>{
    const {videoId} = req.params

   const comment =  await Comment.find({videoId: videoId}, "_id")
   console.log(comment)

   return res
   .status(200)
   .json(new ApiResponse(200, comment, "Get All comments"))
})

const updateComment = asyncHandeler(async(req, res)=>{
    const { commentContent } = req.body
    const {commentId} = req.params

    if(!commentContent){
        throw new ApiError(400, "Enter some comments")
    }

    const comment = await Comment.findOne({ _id: commentId })

    const updatedComment = await Comment.findByIdAndUpdate(commentId,{commentContent: commentContent}, {new : true})

    return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"))
})

const deleteComemnt = asyncHandeler(async(req, res)=>{
    const {commentId} = req.params

    if(!commentId){
        throw new ApiError(400, "Comment not selected")
    }

    const comment = await Comment.deleteOne({_id: commentId})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"))
})

const replyToComment = asyncHandeler(async(req, res)=>{
    
})

export {
    createComment,
    getComments,
    updateComment,
    deleteComemnt
}
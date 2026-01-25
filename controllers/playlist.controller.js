import { ApiError } from "../utils/ApiError.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import multer from "multer";
import {cloudinaryUpload} from "../utils/cloudinary.js"
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
const createPlaylist = asyncHandeler(async(req, res)=>{
    const { playlistName, playlistDescription } = req.body

    if(!playlistDescription || !playlistName){
        throw new ApiError(400, "All fields are required")
    }

    const playlistCoverImageLocalFilePath = req.files?.playlistCoverImage[0]?.path

    const playlistCoverImage = await cloudinaryUpload(playlistCoverImageLocalFilePath)

    const playlist = await Playlist.create({
        playlistName: playlistName,
        playlistDescription:playlistDescription,
        playlistCoverImage:playlistCoverImage?.url,
        owner: req.user?._id,
    })

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created succesfully"))
})

const getPlaylist = asyncHandeler(async(req,res)=>{
    const playlist = await Playlist.find({owner: req.user?._id}, "_id")

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "ALl playlist get succesfully"))
})

const addVideoToPlaylist = asyncHandeler(async(req, res)=>{
    const {playlistId, videoId} = req.params

    if(!videoId){
        throw new ApiError(400, "Video id is required")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(400, "Playlist not found")
    }

    const existingVideo = await Playlist.findOne(
        {
            video:videoId,
            _id: playlistId
        }
    )

    if(existingVideo){
        throw new ApiError(400, "Video already added")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push:{
                video: videoId
            }
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video added to playlist succesfully"))

})

const getPlaylistDetails = asyncHandeler(async(req, res)=>{
    const {playlistId} = req.params

    const playlist = await Playlist.findOne({_id: playlistId})

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist details got"))
})

const removeVideoFromPlaylist = asyncHandeler(async(req, res)=>{
    const {playlistId, videoId} = req.params

    const existingVideo = await Playlist.find({
        _id: playlistId,
        video: videoId
    })
    const updatedPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        { $pull: { video: videoId } },
        { new: true }
    );


    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video removed succesfully"))
})

const deletePlaylist = asyncHandeler(async(req, res)=>{
    const {playlistId} = req.params

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    if(!playlist){
        throw new ApiError(400, "Playlist is not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist deleted succesfully"))
})


export {
    createPlaylist,
    addVideoToPlaylist,
    getPlaylist,
    getPlaylistDetails,
    removeVideoFromPlaylist,
    deletePlaylist
}
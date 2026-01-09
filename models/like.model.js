import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    playlist:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    },
    chat:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    comment:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    video:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export const Like = new mongoose.model("Like", likeSchema)
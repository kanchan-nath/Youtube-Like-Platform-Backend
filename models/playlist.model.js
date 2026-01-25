import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    playlistName:{
        type: String,
        required: [true, "Playlist Name is required"],
    },
    playlistDescription:{
        type: String,
    },
    playlistCoverImage:{
        type: String,
        required: true,
    },
    video:[{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Video",
        // required: true,
    }],
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export const Playlist = new mongoose.model("Playlist", playlistSchema)
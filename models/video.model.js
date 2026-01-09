import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "Video Title is required"],
    },
    videoDescription: {
        type: String,
    },
    videoFile:{
        type: String,
        required: [true, "Video File is required"],
    },
    thumbnail: {
        type: String,
        required: true,
    },
    duration:{
        type:Number,
        required: true
    },
    views:{
        type: Number,
    },
    isPublished:{
        type: Boolean,
        require: true,
    },
    tag:[{
        type: String,
    }],
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    genre:[{
        type: String,
    }]
}, {timestamps:true})

export const Video = new mongoose.model("Video", videoSchema)
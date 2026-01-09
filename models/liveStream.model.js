import mongoose from "mongoose";

const liveStremaSchema = new mongoose.Schema({
    recordedVideoId:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Uesr"
    },
    streamKey:{
        type: String,
        unique: true,
    },
    streamUrl:{
        type: String,
    },
    playbackUrl: {
        type:String,
    },
    title:{
        type: String,
        required: [true, "Live Stream Ttile is required"]
    },
    description: {
        type: String,
        required: [true, "Live Stream Description is required"]
    },
    thumbnail: {
        type: String,
        required: [true, "Live Stream Thumbanail is required"]
    },
    tags:[{
        type:String,
    }],
    genre:{
        type: String
    },
    status: {
        type: String,
        enum: ["scheduled", "live", "ended"],
        required: [true, "Select a field"],
    },
    scheduledStartTime:{
        type: Date,
    },
    endTime: {
        type: Date,
    },
    viewerCount:{
        type: Number,
        required: true,
    },
    peakViewerCount:{
        type: Number,
        required: true,
    },
    isRecorded:{
        type:Boolean,
        required: true,
    },
    chatEnabled:{
        type: Boolean,
        required: true
    }

}, {timestamps: true,})

export const LiveStreams = new mongoose.model("LiveStreams", liveStremaSchema)
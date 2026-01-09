import mongoose from "mongoose";

const liveStreamViewerSchema = new mongoose.Schema(
    {
        viewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        liveStream: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LiveStream",
            required: true,
            index: true
        },
        joinedAt: {
            type: Date,
        },
        leftAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: false }
);

export const LiveStreamViewer = mongoose.model("LiveStreamViewer",liveStreamViewerSchema
);

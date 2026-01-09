import mongoose from "mongoose";

const liveStreamChatSchema = new mongoose.Schema(
    {
        owner: {
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
        content: {
            type: String,
            required: true,
            trim: true
        },
        isPinned: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const LiveStreamChat = mongoose.model("LiveStreamChat",liveStreamChatSchema
);

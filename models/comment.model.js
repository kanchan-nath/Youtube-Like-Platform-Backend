import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commenContent:{
        type: String,
        required: [true, "Enter some text"]
    },
    videoComment:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Video",
    },
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref:  " User",
    },
    
}, {timestamps: true})

export const Comment = new mongoose.model("Comment", commentSchema)
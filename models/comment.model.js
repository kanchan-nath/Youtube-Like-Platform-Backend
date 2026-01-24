import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentContent:{
        type: String,
        required: [true, "Enter some text"]
    },
    videoId:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref:  " User",
        required: true
    },
    parentId:{
        type: new mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
    
}, {timestamps: true})

export const Comment = new mongoose.model("Comment", commentSchema)
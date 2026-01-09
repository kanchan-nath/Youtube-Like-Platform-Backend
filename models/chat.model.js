import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatContent:{
        type: String,
        required: [true, "Enter messages"]
    },
    owner: {
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},{ timestamps: true})

export const Chat = new mongoose.model("Chat", chatSchema)
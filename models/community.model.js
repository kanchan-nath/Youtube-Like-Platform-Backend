import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    post:{
        type: String,
        required: [true, "Enter some messages"]
    },
    owner:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    files:[{
        type: String,
    }]
}, {timestamps: true})

export const Community = new mongoose.model("Community", communitySchema)
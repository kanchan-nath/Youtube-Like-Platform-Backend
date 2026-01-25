import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
        enum: ["BASIC", "PREMIUM", "PLATINIUM"]
    },
    planPrice:{
        type: Number,
        required: [true, "Plan price is required"],
        enum: [99, 599, 999]
    },
    features:[{
        type: String,
        required: true
    }],
     owner:{
        type:  Schema.Types.ObjectId,
        ref: "User"
     },
    
},{timestamps: true})

export const Plan = new mongoose.model("Plan", planSchema)
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    planName:{
        type: String,
        required: [true, "Plan name is required"],
    },
    planPrice:{
        type: Number,
        required: [true, "Plan price is required"],
    },
    features:[{
        type: String,
        required: true
    }],
    
},{timestamps: true})

export const Plan = new mongoose.model("Plan", planSchema)
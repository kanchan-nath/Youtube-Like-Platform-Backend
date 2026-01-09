import mongoose, { mongo } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber:{
        type: new mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    //Channel - doubt
}, {timestamps: true})

export const Subscription = new mongoose.model("Subscription", subscriptionSchema)
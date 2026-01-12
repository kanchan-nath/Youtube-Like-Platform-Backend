import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: [true, "Name is required"],
        index: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    avatar:{
        type: String,
        // required: [true, "Avatar is required"],
    },
    coverImage: {
        type: String,
        // required: [true, "Cover Image is required"],
    },
    age:{
        type: Number,
        required: true,
        trim: true,
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    plan:{
        type:  Schema.Types.ObjectId,
        ref: "Plan"
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema)
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

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
    },
    // expiresAt:{
    //     type: Date,
    //     default: Date.now,
    //     expires: 100,
    // },
    isVerified: {
        type: Boolean,
        default: false,
    }
},{timestamps:true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
    {
        _id:this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
        
)
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User", userSchema)
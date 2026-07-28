import mongoose from "mongoose";

const sessionSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:[true,"user is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true,"refreshToken is required"]
    },
    ip:{
        type:String,
        required:[true,"ip is required"]
    },
    userAgent:{
        type:String,
        required:[true,"userAgent is required"]
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const sessionModel= mongoose.model("session",sessionSchema);

export default sessionModel;
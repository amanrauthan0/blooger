import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content:{
        type:String,
        required:true
    },
    tag:{
        type:String
    },
    published:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default mongoose.model("blog",blogSchema);
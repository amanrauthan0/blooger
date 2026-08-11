import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blogModel from "../models/blog.model.js";

export async function getuserpost(req,res){

    const refreshToken=req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token missing"
        });
    }

    const decode=jwt.verify(refreshToken,config.JWT_SECRET);
    
    const blogs=await blogModel.find({
        author:decode.id
    }).sort({createdAt:-1});

    res.status(200).json({
        blogs
    })

}

export async function postblog(req,res){
    const refreshToken=req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token missing"
        });
    }

    const decode=jwt.verify(refreshToken,config.JWT_SECRET);
    
    const author=decode.id;
    const{title,body,content,tag}=req.body;
    console.log(author);

    const blog=await blogModel.create({
        title,
        author,
        content,
        tag,
        published:true
   })

   res.status(201).json({
    message:"published successfully"
   })

}

export async function getblog(req,res){
    const blog= await blogModel.findById(req.params.id).populate("author","username");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    console.log(blog)
    res.status(200).json(blog);
}
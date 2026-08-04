import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blogModel from "../models/blog.model.js";

export async function getuserpost(req,res){
    const refreshToken=req.cookies.refreshToken;

    console.log(refreshToken);

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token missing"
        });
    }

    const decode=jwt.verify(refreshToken,config.JWT_SECRET);
    
    const blogs=await blogModel.find({
        author:decode.id
    })

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
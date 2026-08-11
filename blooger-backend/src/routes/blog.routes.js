import { Router } from "express";
import * as blogController from "../controller/blog.controller.js"

const blogRouter=Router();

blogRouter.get("/myblogs",blogController.getuserpost);
blogRouter.post("/postblog",blogController.postblog);
blogRouter.get("/:id",blogController.getblog);

export default blogRouter;
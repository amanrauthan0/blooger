import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import morgan from "morgan"
import connectDB from "./config/database.js";
import config from "./config/config.js";
import cookieparser from "cookie-parser"

const app=express();

connectDB();

app.use(express.json());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}));

app.use(morgan("dev"));

app.use(cookieparser());

app.use("/api/auth",authRouter);
app.use("/api/blog",blogRouter);

app.listen(3000,()=>{
    console.log("api running");
})

app.get("/", (req, res) => {
  res.send("Server is running");
});
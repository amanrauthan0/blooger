import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import morgan from "morgan"
import connectDB from "./config/database.js";
import config from "./config/config.js";
import cookieparser from "cookie-parser"

const app=express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(morgan("dev"));

app.use(cookieparser());

app.use("/api/auth",authRouter);
app.use("/api/blog",blogRouter);

app.listen(PORT,()=>{
    console.log(`api running on port ${PORT}`);
})

app.get("/", (req, res) => {
  res.send("Server is running");
});
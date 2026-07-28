import config from "../config/config.js";
import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(config.Mongo_uri);
    console.log("Connected to:", mongoose.connection.name);

};

export default connectDB;
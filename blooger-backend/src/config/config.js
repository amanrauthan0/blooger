import dotenv from "dotenv"

dotenv.config();

const config={
    Mongo_uri:process.env.Mongo_uri,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config;
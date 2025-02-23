import {v2 as cloudinary} from "cloudinary";
import {config} from "dotenv";

config();

cloudinary.config({
    cloud_name:process.env.CLOUD_API_KEY,
    api_key:process.env.CLOUD_API_SECRET,
    api_secret:process.env.CLOUD_API_SECRET
});

export default cloudinary;
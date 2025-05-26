import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config(); 
// Configuration details from your Cloudinary account
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,         // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET,   // Your Cloudinary API Secret
});

export default cloudinary;
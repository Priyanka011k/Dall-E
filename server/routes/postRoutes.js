import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
})



//CREATE A POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo} = req.body;
    // const photoUrl = await cloudinary.uploader.upload(photo);
    const base64Data = photo.replace(/^data:image\/(png|jpeg);base64,/, '');
const photoUrl = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`);
console.log("Received photo:", photo?.slice(0, 100));
console.log("Cloudinary upload result:", photoUrl);


    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    })
    
    res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Upload error:", error.message); 
        res.status(500).json({ success: false, message: error.message });
    }
})



export default router;
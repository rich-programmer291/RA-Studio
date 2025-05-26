import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js'; // Import Cloudinary configuration
import Image from '../Models/imageModel.js';
import protect from '../Routes/authMiddleware.js'; // Import the protect middleware
import streamifier from 'streamifier'; // For streaming file uploads to Cloudinary

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory before uploading to Cloudinary
const upload = multer({ storage: storage });

const router = express.Router();

//like route
router.post('/like', async (req, res) => {
    const {imageId} = req.body;

    if (!imageId) {
        return res.status(400).json({ message: 'Image ID is required' });
    }

    try {
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        image.likes = (image.likes || 0) + 1;
        await image.save();
        
        res.status(200).json({ message: 'Image liked successfully', likes: image.likes });
    }
    catch (err) {
        console.error('Like error:', err);
        res.status(500).json({ message: 'Error liking image', error: err });
    }
});

router.post('/unlike', async (req, res) => {
    const {imageId} = req.body;

    if (!imageId) {
        return res.status(400).json({ message: 'Image ID is required' });
    }

    try {
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        image.likes = (image.likes || 0) - 1;
        await image.save();

        res.status(200).json({ message: 'Image unliked successfully', likes: image.likes });
    }
    catch (err) {
        console.error('Like error:', err);
        res.status(500).json({ message: 'Error unliking image', error: err });
    }
});

// Image upload route 
router.post('/upload', upload.single('file'), async (req, res) => {
    const { location, caption } = req.body;
    const uniqueCode = `img_${Date.now()}`;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'gallery_images',
                        public_id: uniqueCode,
                        overwrite: true
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload();

        const newImage = new Image({
            url: result.secure_url,
            public_id: result.public_id,
            location: location || 'Somewhere on this Planet',
            caption: caption || '',
        });

        await newImage.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: newImage,
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// Image delete route 
router.delete('/delete', async (req, res) => {
    const { public_id } = req.body;
  
    if (!public_id) {
      return res.status(400).json({ message: 'Public ID is required' });
    }
  
    try {
      const result = await cloudinary.uploader.destroy(public_id);
  
      if (result.result === 'ok') {
        await Image.deleteOne({ public_id });
        res.status(200).json({ message: 'Image deleted successfully' });
      } else {
        res.status(400).json({ message: 'Failed to delete image from Cloudinary', result });
      }
    } catch (err) {
      console.error('Delete error:', err);
      res.status(500).json({ message: 'Error deleting image', error: err });
    }
  });

// Get all images route 
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({ images });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching images', error: err });
    }
});

export default router;
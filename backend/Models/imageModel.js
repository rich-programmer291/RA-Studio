import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },       // The URL of the image (Cloudinary URL)
  public_id: { type: String, required: true }, // The public ID (Cloudinary's unique identifier for the image)
  location: { type: String, required: false }, // Optional location of the image
  caption: { type: String, required: false },  // Optional caption for the image
  createdAt: { type: Date, default: Date.now }, // Store the creation date
  likes: {type: Number, default: 0}
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
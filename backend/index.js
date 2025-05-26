import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import authRoutes from './Routes/authRoutes.js';
import imageRoutes from './Routes/imageRoutes.js';
import cors from 'cors';


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the RA Studio API!');
});

connectDB();
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});


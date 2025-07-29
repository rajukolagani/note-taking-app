import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/authRoutes';
import noteRoutes from '../routes/noteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORRECT ORDER
app.use(express.json());   // Parse JSON request bodies FIRST
app.use(cors());           // Handle CORS after body is parsed

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));
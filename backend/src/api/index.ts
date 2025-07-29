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

// Configure CORS for your deployed frontend origin(s)
const corsOptions = {
    // This is the URL of your deployed frontend that will be making requests to this backend
    origin: 'https://note-taking-app-vgf2.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authorization headers
    optionsSuccessStatus: 204 // Handle pre-flight OPTIONS requests
};
app.use(cors(corsOptions)); // Use the configured corsOptions

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
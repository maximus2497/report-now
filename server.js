require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const reportSchema = new mongoose.Schema({
    image: String,
    latitude: String,
    longitude: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Routes
app.post('/api/report', upload.single('image'), async (req, res) => {
    try {
        const { latitude, longitude, description } = req.body;
        const imageFile = req.file;

        // Save image path (optionally save the file content to database or cloud storage)
        const imagePath = path.join(__dirname, 'uploads', imageFile.filename);

        const report = new Report({ image: imagePath, latitude, longitude, description });
        await report.save();

        res.status(201).json({ message: 'Report saved successfully!' });
    } catch (error) {
        console.error('Error saving report:', error);
        res.status(500).json({ error: 'Failed to save report' });
    }
});

// Serve static files (optional for hosting frontend with backend)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

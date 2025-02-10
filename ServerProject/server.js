/**
 * @fileoverview Main server application file that sets up Express server and MongoDB connection
 * @requires express
 * @requires mongoose
 * @requires body-parser
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const costRoutes = require('./routes/costRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://JackyLegs:eliran1010@cluster0.6aytt.mongodb.net/';

// Middleware
app.use(bodyParser.json());

/**
 * @description Mount API routes
 */
app.use('/api', userRoutes);
app.use('/api', costRoutes);
app.use('/api', aboutRoutes);

// Only start the server if this file is run directly
if (require.main === module) {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err.message);
        });
}

module.exports = app;  // Export the app for testing

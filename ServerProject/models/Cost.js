const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef Cost
 * @property {string} description - Description of the cost
 * @property {string} category - Category of cost (food, health, housing, sport, education)
 * @property {string} userid - Reference to user ID
 * @property {number} sum - Cost amount
 * @property {Date} date - Date of the cost
 */
const costSchema = new Schema({
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['food', 'health', 'housing', 'sport', 'education'] // All required categories
    },
    userid: { type: String, ref: "User", required: true },
    sum: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cost', costSchema);

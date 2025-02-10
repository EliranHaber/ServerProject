const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const User = require('../models/User');

/**
 * @route POST /api/add
 * @description Add a new cost entry to the database
 * @param {Object} req.body
 * @param {string} req.body.description - Description of the cost
 * @param {string} req.body.category - Category of the cost (food, health, housing, education)
 * @param {string} req.body.userid - User ID
 * @param {number} req.body.sum - Cost amount
 * @param {string} req.body.date - Cost date
 * @returns {Object} Created cost object or error message
 */
router.post('/add', async (req, res) => {
    const { description, category, userid, sum, date } = req.body;
    
    if(!description || !sum || !category || !userid){
        return res.status(400).json({
            error: "All fields (description, sum, category, user_id) are required"
        });
    }
    try {
        const userExists = await User.findOne({ id: userid});
        if (!userExists){
            return res.status(404).json({
                error: "User not found."
            });
        }

        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date ? new Date(date) : new Date()
        });
        
        await cost.save();
        res.json(cost);
    } catch (err) {
        res.status(400).json({ message: "Error adding cost", err });
    }
});

/**
 * @route GET /api/report
 * @description Get monthly cost report for a specific user
 * @param {Object} req.query
 * @param {string} req.query.id - User ID to get report for
 * @param {string} req.query.year - Year of the report
 * @param {string} req.query.month - Month of the report
 * @returns {Object} Report containing costs grouped by category or an error message with appropriate status codes.
 */
router.get('/report', async (req, res) => {
    const { id, year, month } = req.query;

    if(!id || !year || !month){
        return res.status(400).json({
            error: "All fields (id, year, month) are required"
        });
    }
    try {
        const startDate = new Date(year, month - 1, 1, 0, 0, 0);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const costs = await Cost.find({
            userid: id,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const report = {
            userid: id,
            year: parseInt(year),
            month: parseInt(month),
            costs: []
        };

        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        
        categories.forEach(category => {
            const categoryCosts = costs
                .filter(cost => cost.category === category)
                .map(cost => ({
                    sum: cost.sum,
                    description: cost.description,
                    day: new Date(cost.date).getUTCDate()
                }));
            
            report.costs.push({ [category]: categoryCosts });
        });

        res.json(report);
    } catch (err) {
        res.status(400).json({ message: "Error getting report", err });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');


/**
 * Route to get user details by ID.
 * @name GET /users/:id
 * @description Get user's details from the database 
 * @returns {Object} User's details if found, or an error message with appropriate status codes.
 */
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        console.log("Error, missing user id");
        return res.status(400).json({
            error: "Please provide user id"
        });
    }
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error getting user", err });
    }
});

module.exports = router;

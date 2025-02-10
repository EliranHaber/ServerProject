const express = require('express');
const router = express.Router();

/**
 * @typedef TeamMember
 * @property {string} first_name - Team member's first name
 * @property {string} last_name - Team member's last name
 */
const team = [
    { first_name: 'Eliran', last_name: 'Haber' },
    { first_name: 'Lusil', last_name: 'Grozdanov' },
];

/**
 * @route GET /api/about
 * @description Get team information
 * @returns {TeamMember[]} Array of team members
 */
router.get('/about', (req, res) => {
    res.json(team);
});

module.exports = router;

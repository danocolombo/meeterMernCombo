const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Client = require('../../models/Client');
const User = require('../../models/User');

// @route    GET api/client/
// @desc     Get list of clients
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const client = await Client.find();

        if (!client) {
            return res.status(400).json({ msg: 'No clients in system' });
        }

        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;

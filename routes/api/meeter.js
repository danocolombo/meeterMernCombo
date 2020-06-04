const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Client = require('../../models/Client');
const User = require('../../models/User');

// @route    PUT api/client/privledges/:code/:uid
// @desc     put privledges for user of client code
// @access   Private
router.put('/setUserRole', auth, async (req, res) => {
    const { client, user } = req.body;

    try {
        //----------------------------------------------
        // get the client info
        const cData = await Client.find({ code: client }).select('-_id');
        if (Object.keys(cData).length === 0) {
            return res.status(400).json({ msg: 'client not found' });
        }

        var p = JSON.parse(JSON.stringify(cData));
        const church = p[0];
        if (church.name) console.log('church: ' + church.name);

        const clientPrivs = null;
        if (!clientPrivs) {
            return res.status(400).json({ msg: 'Cannot process request' });
        }

        res.json(clientPrivs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

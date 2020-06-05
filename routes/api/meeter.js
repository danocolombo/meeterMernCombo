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
router.put('/setUserAuth', auth, async (req, res) => {
    const { client, uid } = req.body;

    try {
        //----------------------------------------------
        // get the client info
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        // console.log(' inside routes/api:meeter::setUserAuth');
        // console.log('client: ' + client);
        // console.log('uid: ' + uid);
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        if (!client || !uid) {
            return res
                .status(400)
                .json({ msg: 'Request requirements not met' });
        }
        const cData = await Client.find({ code: client }).select('-_id');
        if (Object.keys(cData).length === 0) {
            return res.status(400).json({ msg: 'client not found' });
        }

        var p = JSON.parse(JSON.stringify(cData));
        const church = p[0];
        // if (church.name) console.log('*church: ' + church.name);
        // confirm we have users provided in client definitions

        if (!church.users) {
            const tmsg = church.name + ' client [users] undefined';
            return res.status(400).json({ msg: { tmsg } });
        }
        //loop through the users array to find the users role.
        let activeClient = church.code;
        let activeRole = 'unregistered';
        let activeStatus = 'unregistered';
        for (let i = 0; i < church.users.length; i++) {
            if (church.users[i]._id === uid) {
                activeRole = church.users[i].role;
                activeStatus = church.users[i].status;
            }
        }
        // console.log('defined role: ' + activeRole);
        // console.log('defined status: ' + activeStatus);

        const body = JSON.stringify({ activeClient, activeRole, activeStatus });

        const clientPrivs = null;
        if (!body) {
            return res.status(400).json({ msg: 'Cannot process request' });
        }
        res.json(JSON.parse(body));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

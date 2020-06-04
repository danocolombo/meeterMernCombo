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
        const client = await Client.find().populate('user', ['name', 'avatar']);

        if (!client) {
            return res.status(400).json({ msg: 'No clients in system' });
        }

        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/client/:cid
// @desc     Get list of clients
// @access   Private
router.get('/:cid', auth, async (req, res) => {
    try {
        console.log('API::cid: ' + req.param.cid);
        const client = await Client.findById(req.params.cid);

        if (!client) {
            return res
                .status(400)
                .json({ msg: 'No client info for client request' });
        }

        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/client/code/:code
// @desc     get client by code
// @access   Private
router.get('/code/:code', auth, async (req, res) => {
    try {
        // console.log('API::cid: ' + req.param.cid);
        const client = await Client.findOne({ code: req.params.code });

        if (!client) {
            return res
                .status(400)
                .json({ msg: 'No client info for client request' });
        }

        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/client/privledges/:code/:uid
// @desc     get privledges for user of client code
// @access   Private
router.get('/privledges/:code/:uid', auth, async (req, res) => {
    try {
        //----------------------------------------------
        // get the client info
        const cData = await Client.find({ code: req.params.code }).select(
            '-_id'
        );
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

// @route    POST api/client
// @desc     Create or update client
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('code', 'Code is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const client = await Client.findById(req.user.id).select(
                '-password'
            );

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;

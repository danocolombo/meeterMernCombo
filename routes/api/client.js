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

// @route    GET api/client/users/:code
// @desc     get the users for client code
// @access   Private
router.get('/users/:code', auth, async (req, res) => {
    try {
        const client = await Client.findOne({ code: req.params.code });
        if (!client) {
            return res
                .status(400)
                .json({ msg: 'No user info for client request' });
        }
        const allUsers = await User.find();
        // we have the client, now we need to build a body to
        // respond with the users.
        // const util = require('util');
        // console.log(util.inspect(allUsers, { showHidden: false, depth: null }));
        // console.log('client.name: ' + client.name);

        let cEntry = [];
        let str1 = '';
        let str2 = '';
        client.users.forEach((u) => {
            // console.log('role: ' + u.role);
            allUsers.forEach((aU) => {
                // need to cast array value as string
                str1 = String(u._id);
                str2 = String(aU._id);
                if (str1.trim() == str2.trim()) {
                    cEntry.push({
                        _id: u._id,
                        name: aU.name,
                        email: aU.email,
                        defaultClient: aU.defaultClient,
                        role: u.role,
                        status: u.status,
                    });
                }
            });
        });
        res.json(cEntry);
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

// @route    PUT api/client/user
// @desc     Add or Update client user
// @access   Private
router.put(
    '/user',
    auth,
    [
        check('_id', 'ID is required').not().isEmpty(),
        check('cid', 'CID is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
        check('status', 'Status is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if we got errors
            return res.status(400).json({ errors: errors.array() });
        }
        // destructure req
        const { _id, cid, role, status } = req.body;
        // create a body to pass from the data received
        // the definition _id is equvilent to _id: id
        // we don't need cid in the body to save
        const userInfo = {
            _id,
            role,
            status,
        };
        try {
            // //see if user exists for client
            const client = await Client.findOne({
                code: cid,
                'users._id': _id,
            });
            const util = require('util');
            // console.log('cid.activeClient: ' + cid.activeClient);
            console.log(
                util.inspect(client, { showHidden: false, depth: null })
            );
            if (client) {
                console.log('EXISTING USER NEEDS UPDATING');
                //user exists, update it
                console.log('code: ' + cid);
                console.log('user.id: ' + _id);
                const updateClient = await Client.findOneAndUpdate(
                    {
                        code: cid,
                        'users._id': _id,
                    },
                    {
                        $set: {
                            'users.$.role': role,
                            'users.$.status': status,
                        },
                    },
                    null,
                    (err) => {
                        if (err) {
                            console.log('Error: ' + err);
                        } else {
                            console.log('Updated: ' + _id);
                        }
                        // process.exit(0);
                        // res.json(updateClient);
                    }
                );
                res.json(updateClient);
            } else {
                console.log('NEW USER ENTRY');
                //need to add the user to the client
                //first thing, find the client entry to add/update user
                const newClientUpdate = await Client.findOne({ code: cid });
                //push the entry onto the end of users subarray
                newClientUpdate.users.push(userInfo);
                //save the changes
                await newClientUpdate.save();
                res.json(newClientUpdate);
            }
        } catch (err) {
            console.error('WOWSA: ' + err.message);
            res.status(500).send('Server Error');
        }
    }
);
// @route    PUT api/client/user
// @desc     Add or Update default group setting
// @access   Private
router.put(
    '/defaultgroup',
    auth,
    [
        check('cid', 'CID is required').not().isEmpty(),
        check('gender', 'Gender is required').not().isEmpty(),
        check('title', 'Title is required').not().isEmpty(),
        // check('location', 'Location is required').not().isEmpty(),
        // check('facilitator', 'Facilitator is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if we got errors
            return res.status(400).json({ errors: errors.array() });
        }
        // destructure req
        const { cid, gender, title, location, facilitator } = req.body;
        // create a body to pass from the data received
        const groupInfo = {
            gender: gender,
            title: title,
            location: location,
            facilitator: facilitator,
        };
        try {
            console.log('NEW GROUP ENTRY');
            //need to add the user to the client
            //first thing, find the client entry to add/update user
            const newDefaultGroup = await Client.findOne({
                code: cid,
            });
            //push the entry onto the end of users subarray
            newDefaultGroup.defaultGroups.push(groupInfo);
            //save the changes
            await newDefaultGroup.save();
            res.json(newDefaultGroup);
        } catch (err) {
            console.error('WOWSA: ' + err.message);
            res.status(500).send('Server Error');
        }
    }
);
router.delete('/defaultgroup', auth, async (req, res) => {
    try {
        const { cid, gender, title, location, facilitator } = req.body;

        // Remove profile
        //await Client.findOneAndRemove({ code: cid, 'defaultGroups.gender': gender, 'defaultGroups.title': title, 'defaultGroups.location': location, 'defaultGroups.facilitator': facilitator });

        await Client.update(
            { code: cid },
            {
                $pull: {
                    defaultGroups: {
                        gender: gender,
                        title: title,
                        location: location,
                        facilitator: facilitator,
                    },
                },
            }
        );

        const feedback = 'Default Group Removed';
        res.json({ msg: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/client/defaultgroups/:code
// @desc     get the default groups for client code
// @access   Private
router.get('/defaultgroups/:code', auth, async (req, res) => {
    try {
        const client = await Client.findOne({ code: req.params.code });
        if (!client) {
            return res
                .status(400)
                .json({ msg: 'No user info for client request' });
        }

        let dGroups = [];
        client.defaultGroups.forEach((g) => {
            dGroups.push({
                _id: g._id,
                gender: g.gender,
                title: g.title,
                location: g.location,
                facilitator: g.facilitator,
            });
        });
        res.json(dGroups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;

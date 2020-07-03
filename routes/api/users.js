const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Client = require('../../models/Client');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('defaultClient', 'Client is required').not().isEmpty(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, defaultClient } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }
            //======================================================
            // now save the user
            //======================================================
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                name,
                email,
                defaultClient,
                avatar,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //------ ADDING USER TO CLIENT DOC ------
            const reqUser = {};
            reqUser._id = user.id;
            reqUser.name = user.name;
            reqUser.email = user.email;
            reqUser.role = 'unregistered';
            reqUser.status = 'pending';

            //first thing, find the client entry to add/update user
            const newClientUpdate = await Client.findOne({
                code: defaultClient,
            });

            // push the entry onto the end of users subarray
            newClientUpdate.users.push(reqUser);
            //save the changes
            await newClientUpdate.save();
            //------ DONE ADDING USER TO CLIENT DOC ------

            const payload = {
                user: {
                    id: user.id,
                },
            };
            // the expires in will determine when user gets logged out
            // 3600 = 1 hour
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
// @route    GET api/users
// @desc     Return all users
// @access   PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// @route    GET api/user/:uid
// @desc     Return user of uid
// @access   PRIVATE
router.get(
    '/identify/:uid',
    [check('uid', 'id is required').not().isEmpty()],
    auth,
    async (req, res) => {
        try {
            // console.log('API::cid: ' + req.param.cid);
            const user = await User.findById({ _id: req.params.uid });

            if (!user) {
                return res.status(400).json({ msg: 'No user info avaialble' });
            }

            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
// @route    DELETE api/users/:id
// @desc     Delete user by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.params.id });
        return res.status(200).json({ msg: 'user removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
// @route    DELETE api/users/:email
// @desc     Delete user by email
// @access   Private
router.delete('/email/:email', auth, async (req, res) => {
    try {
        await User.findOneAndRemove({ email: req.params.email });
        return res.status(200).json({ msg: 'user removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;

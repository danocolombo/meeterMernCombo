const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Human = require('../../models/Human');
//==========================================
//  _____   ____   _____ _______       __
// |  __ \ / __ \ / ____|__   __|     / /
// | |__) | |  | | (___    | |       / /
// |  ___/| |  | |\___ \   | |      / /
// | |    | |__| |____) |  | |     / /
// |_|     \____/|_____/   |_|    /_/
//==========================================
// @route    POST api/human
// @desc     Register human
// @access   Public
router.post(
    '/',
    [check('name', 'Name is required').not().isEmpty()],
    [check('tenantId', 'Tenant code is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            gender,
            email,
            phone,
            shirtSize,
            birthday,
            active,
            service,
            training,
            system,
            notes,
        } = req.body;
        const humanFields = {};
        humanFields.name = name;
        if (email) {
            humanFields.email = email;
        } else {
            humanFields.email = '';
        }
        if (gender) {
            humanFields.gender = gender;
        } else {
            humanFields.gender = '';
        }
        if (phone) {
            humanFields.phone = phone;
        } else {
            humanFields.phone = '';
        }
        if (shirtSize) {
            humanFields.shirtSize = shirtSize;
        } else {
            humanFields.shirtSize = '';
        }
        if (birthday) {
            humanFields.birthday = birthday;
        } else {
            humanFields.birthday = '';
        }
        if (active) humanFields.active = active;
        if (service) {
            humanFields.service = service;
        } else {
            humanFields.service = '';
        }
        try {
            let human = await Human.findOneAndUpdate(
                { name: name },
                { $set: humanFields },
                { new: true, upsert: true }
            );
            res.json(human);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
//===============================================
//   _____ ______ _______       __
//  / ____|  ____|__   __|     / /
// | |  __| |__     | |       / /
// | | |_ |  __|    | |      / /
// | |__| | |____   | |     / /
//  \_____|______|  |_|    /_/
//===============================================
// @route   GET api/human/
router.get('/', async (req, res) => {
    try {
        //this is going to return the persons that are
        // not defined with system
        const humans = await Human
            .find({ system: { $ne: true } })
            .sort({
                name: 1,
            });
        res.json(humans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//===============================================
//  _____  _____ _____       __  _ _            _       __     _     _ 
// |  __ \|  ___|_   _|     / / | (_)          | |     / /    (_)   | |
// | |  \/| |__   | |      / /__| |_  ___ _ __ | |_   / (_)___ _  __| |
// | | __ |  __|  | |     / / __| | |/ _ \ '_ \| __| / /  / __| |/ _` |
// | |_\ \| |___  | |    / / (__| | |  __/ | | | |_ / /  | (__| | (_| |
//  \____/\____/  \_/   /_/ \___|_|_|\___|_| |_|\__/_/  (_)___|_|\__,_|                                                                   
//===============================================
// @route    GET api/human/client/:cid
// @desc     Get all humans with clientid
// @access   Public
router.get('/client/:cid', async (req, res) => {
    try {
        const humans = await Human.find({
                tenantId: req.params.cid,
            }).sort({
                name: 1,
            });
            // .find({ system: { $ne: true } })
            // .sort({
            //     name: 1,
            // });
        res.json(humans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//===============================================
//   _____ ______ _______       __                             _
//  / ____|  ____|__   __|     / /                            | |
// | |  __| |__     | |       / /__  ___ _ ____   ____ _ _ __ | |_ ___
// | | |_ |  __|    | |      / / __|/ _ \ '__\ \ / / _` | '_ \| __/ __|
// | |__| | |____   | |     / /\__ \  __/ |   \ V / (_| | | | | |_\__ \
//  \_____|______|  |_|    /_/ |___/\___|_|    \_/ \__,_|_| |_|\__|___/
//===============================================
// @route    POST api/human/servants
// @desc     get all the servants
// @access   Public
router.get('/servants', async (req, res) => {
    try {
        //this is going to return the persons that are
        // not defined with system
        const humans = await Human
            .find({
                $and: [
                    { system: { $ne: true } },
                    { service: { $exists: true } },
                ],
            })
            .sort({
                name: 1,
            });
        res.json(humans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//===============================================
//   _____ ______ _______       __   _ _
//  / ____|  ____|__   __|     / /  | | |
// | |  __| |__     | |       / /_ _| | |
// | | |_ |  __|    | |      / / _` | | |
// | |__| | |____   | |     / / (_| | | |
//  \_____|______|  |_|    /_/ \__,_|_|_|
//===============================================

// @route    GET api/humans/all
// @desc     Get all humans
// @access   Public
router.get('/all', async (req, res) => {
    try {
        const humans = await Human.find().sort({ name: 1 });
        res.json(humans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//====================================================================
//   _____ ______ _______       __ _     _
//  / ____|  ____|__   __|     / /(_)   | |
// | |  __| |__     | |       / (_)_  __| |
// | | |_ |  __|    | |      / /  | |/ _` |
// | |__| | |____   | |     / /  _| | (_| |
//  \_____|______|  |_|    /_/  (_)_|\__,_|
//====================================================================
// @route    GET api/humans/:id
// @desc     Get human by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const human = await Human.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !human) {
            return res.status(404).json({ msg: 'Human not found' });
        }

        res.json(human);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});
//====================================================================
//  _____  ______ _      ______ _______ ______       __ _     _
// |  __ \|  ____| |    |  ____|__   __|  ____|     / /(_)   | |
// | |  | | |__  | |    | |__     | |  | |__       / (_)_  __| |
// | |  | |  __| | |    |  __|    | |  |  __|     / /  | |/ _` |
// | |__| | |____| |____| |____   | |  | |____   / /  _| | (_| |
// |_____/|______|______|______|  |_|  |______| /_/  (_)_|\__,_|
//====================================================================
// @route    DELETE api/human/:id
// @desc     Delete human by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Human.findOneAndRemove({ _id: req.params.id });
        return res.status(200).json({ msg: 'human removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;

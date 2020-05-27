const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Person = require('../../models/Person');
//==========================================
//  _____   ____   _____ _______       __
// |  __ \ / __ \ / ____|__   __|     / /
// | |__) | |  | | (___    | |       / /
// |  ___/| |  | |\___ \   | |      / /
// | |    | |__| |____) |  | |     / /
// |_|     \____/|_____/   |_|    /_/
//==========================================
// @route    POST api/person
// @desc     Register person
// @access   Public
router.post(
    '/',
    [check('name', 'Name is required').not().isEmpty()],
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
        const personFields = {};
        personFields.name = name;
        if (email) {
            personFields.email = email;
        } else {
            personFields.email = '';
        }
        if (gender) {
            personFields.gender = gender;
        } else {
            personFields.gender = '';
        }
        if (phone) {
            personFields.phone = phone;
        } else {
            personFields.phone = '';
        }
        if (shirtSize) {
            personFields.shirtSize = shirtSize;
        } else {
            personFields.shirtSize = '';
        }
        if (birthday) {
            personFields.birthday = birthday;
        } else {
            personFields.birthday = '';
        }
        if (active) personFields.active = active;
        if (service) {
            personFields.service = service;
        } else {
            personFields.service = '';
        }
        try {
            let person = await Person().findOneAndUpdate(
                { name: name },
                { $set: personFields },
                { new: true, upsert: true }
            );
            res.json(person);
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
// @route   GET api/person/
router.get('/', async (req, res) => {
    try {
        //this is going to return the persons that are
        // not defined with system
        const persons = await Person()
            .find({ system: { $ne: true } })
            .sort({
                name: 1,
            });
        res.json(persons);
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
// @route   GET api/servants/
router.get('/servants', async (req, res) => {
    try {
        //this is going to return the persons that are
        // not defined with system
        const persons = await Person()
            .find({
                $and: [
                    { system: { $ne: true } },
                    { service: { $exists: true } },
                ],
            })
            .sort({
                name: 1,
            });
        res.json(persons);
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

// @route    GET api/person/all
// @desc     Get all persons
// @access   Public
router.get('/all', async (req, res) => {
    try {
        const persons = await Person().find().sort({ name: 1 });
        res.json(persons);
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
// new inline getMeeting....
// @route    GET api/person/:id
// @desc     Get meeting by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const person = await Person().findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !person) {
            return res.status(404).json({ msg: 'Person not found' });
        }

        res.json(person);
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
// @route    DELETE api/person/:id
// @desc     Delete meeting by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Person().findOneAndRemove({ _id: req.params.id });
        return res.status(200).json({ msg: 'person removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;

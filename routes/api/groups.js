const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');

const Groups = require('../../models/Groups');

// @route    GET api/groups/meeting/:mid
// @desc     Get groups for meeting ID
// @access   Private
router.get('/meeting/:mid', auth, async (req, res) => {
    try {
        const groups = await Groups.find({ mid: req.params.mid });

        res.json(groups);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    GET api/groups/group/:gid
// @desc     Get group for group id
// @access   Private
router.get('/group/:gid', auth, async (req, res) => {
    try {
        const groups = await Groups.findById(req.params.gid);
        res.jsonp(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/groups/group/:gid
// @desc     Get group for group id
// @access   Private
router.get('/:gid', auth, async (req, res) => {
    try {
        const groups = await Groups.findById(req.params.gid);
        res.jsonp(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//=========================================
//  @route  POST api/groups
//  @desc   Create or update group
//  @access Private
//=========================================
router.post(
    '/',
    [
        auth,
        [
            check('meetingId', 'Meeting ID is required').not().isEmpty(),
            check('title', 'Title is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            meetingId,
            groupId,
            title,
            attendance,
            gender,
            location,
            facilitator,
            cofacilitator,
            notes,
        } = req.body;
        // if (req.params.gid) console.log('gid:' + req.params.gid);

        const groupFields = {};
        //first two are required, no need to check.
        groupFields.mid = meetingId;
        groupFields.title = title;
        //=====================================
        // if it is group update, they will provide
        // a group id
        //if (req.params.gid) groupFields.gid = req.params.gid;
        if (attendance) {
            groupFields.attendance = attendance;
        } else {
            groupFields.attendance = 0;
        }
        if (gender) groupFields.gender = gender;
        if (location) groupFields.location = location;
        if (facilitator) groupFields.facilitator = facilitator;
        if (cofacilitator) groupFields.cofacilitator = cofacilitator;
        if (notes) groupFields.notes = notes;

        try {
            if (groupId && groupId != 0) {
                // if we have gid, then attempt to do update, otherwise, insert
                // let group = await Groups.findOne({ _id: req.params.gid });
                // if (req.params.gid) {
                //     //attempt to get the group before attempting to update
                //     //to make sure it exists
                //     if (group) {
                let uGroup = await Groups.findOneAndUpdate(
                    { _id: groupId },
                    { $set: groupFields },
                    { new: true, upsert: true }
                );
                res.json(uGroup);
                //     }
                // } else {
                //     console.error(err.message);
                //     res.status(400).send('Group not found');
                // }
            } else {
                let nGroup = await Groups.findOneAndUpdate(
                    {
                        mid: groupFields.mid,
                        title: groupFields.title,
                        gender: groupFields.gender,
                    },
                    { $set: groupFields },
                    { new: true, upsert: true }
                );
                res.json(nGroup);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        // }
    }
);

// @route    POST api/groups/group
// @desc     Create or update a group
// @access   Private
router.post(
    '/group/:gid',
    [
        auth,
        [
            check('mid', 'Meeting ID is required').not().isEmpty(),
            check('title', 'Title is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            mid,
            title,
            attendance,
            gender,
            location,
            facilitator,
            cofacilitator,
            notes,
        } = req.body;
        const groupFields = {};

        //first two are required, no need to check.
        groupFields.mid = mid;
        groupFields.title = title;
        //=====================================
        // if it is group update, they will provide
        // a group id
        //-----------------------
        if (attendance) {
            groupFields.attendance = attendance;
        } else {
            groupFields.attendance = 0;
        }
        if (gender) groupFields.gender = gender;
        if (location){groupFields.location = location}else{groupFields.location='';}
        if (facilitator){groupFields.facilitator = facilitator}else{groupFields.facilitator ='';}
        if (cofacilitator){groupFields.cofacilitator = cofacilitator}else{groupFields.cofacilitator = '';}
        if (notes){ groupFields.notes = notes}else{ groupFields.notes = '';}
        
        try {
            if (req.params.gid != 0) {
                // if we have gid, then attempt to do update, otherwise, insert
                let group = await Groups.findOne({ _id: req.params.gid });
                if (req.params.gid) {
                    //attempt to get the group before attempting to update
                    //to make sure it exists
                    if (group) {
                        let uGroup = await Groups.findOneAndUpdate(
                            { _id: req.params.gid },
                            { $set: groupFields },
                            { new: true, upsert: true }
                        );
                        res.json(uGroup);
                    }
                } else {
                    console.error(err.message);
                    res.status(400).send('Group not found');
                }
            } else {
                let nGroup = await Groups.findOneAndUpdate(
                    {
                        mid: groupFields.mid,
                        title: groupFields.title,
                        gender: groupFields.gender,
                    },
                    { $set: groupFields },
                    { new: true, upsert: true }
                );
                res.json(nGroup);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        // }
    }
);
// @route    DELETE api/groups/:gid
// @desc     Delete group by ID
// @access   Private
router.delete('/:gid', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.gid);
        await group.remove();
        res.json({ msg: 'Post removed' });

        // await Groups.findOneAndRemove({ _id: req.params.gid });
        // const feedback = 'Group removed (' + req.params.gid + ')';
        // res.json({ msg: feedback });
        // return res.status(200).json({ msg: 'group removed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
// @route    DELETE api/groups/bymeeting/:mid
// @desc     Delete all groups by meeting ID
// @access   Private
router.delete('/bymeeting/:mid', auth, async (req, res) => {
    try {
        await Groups.deleteMany({"mid": req.params.mid});

        res.json({ msg: 'Groups removed' });
    } catch (error) {
        //routes/api/groups/
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;

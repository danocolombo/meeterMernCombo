const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator');
const Meeting = require('../../models/Meeting');
const User = require('../../models/User');
const Post = require('../../models/Post');

// // @route    GET api/profile/me
// // @desc     Get current users profile
// // @access   Private
// router.get('/me', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.user.id
//     }).populate('user', ['name', 'avatar']);

//     if (!profile) {
//       return res.status(400).json({ msg: 'There is no profile for this user' });
//     }

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route    POST api/meeting
// @desc     Create or update a meeting
// @access   Private
router.post(
    '/',
    [
        auth,
        [
            // check('title', 'Title is required')
            //     .not()
            //     .isEmpty(),
            check('meetingDate', 'Meeting date is required').not().isEmpty(),
            check('meetingType', 'Meeting Type is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            meetingId,
            meetingDate,
            facilitator,
            meetingType,
            tenantId,
            title,
            supportRole,
            worship,
            attendance,
            donations,
            avContact,
            meal,
            mealCoordinator,
            mealCount,
            cafeCoordinator,
            newcomers,
            nursery,
            children,
            youth,
            notes,
        } = req.body;

        const meetingFields = {};
        //first two are required, no need to check.
        meetingFields.meetingDate = meetingDate;
        meetingFields.meetingType = meetingType;
        if (meetingId) meetingFields.meetingId = meetingId;
        if (tenantId) meetingFields.tenantId = tenantId;
        if (facilitator) meetingFields.facilitator = facilitator;
        if (title) meetingFields.title = title;
        if (supportRole) {
            meetingFields.supportRole = supportRole;
        } else {
            meetingFields.supportRole = '';
        }
        if (worship) meetingFields.worship = worship;
        if (attendance) {
            meetingFields.attendance = attendance;
        } else {
            meetingFields.attendance = 0;
        }
        if (avContact) {
            meetingFields.avConcact = avContact;
        }
        if (donations) {
            meetingFields.donations = donations;
        } else {
            meetingFields.donations = 0;
        }
        if (meal) meetingFields.meal = meal;
        if (mealCoordinator) meetingFields.mealCoordinator = mealCoordinator;
        if (mealCount) {
            meetingFields.mealCount = mealCount;
        } else {
            meetingFields.mealCount = 0;
        }
        if (cafeCoordinator) meetingFields.cafeCoordinator = cafeCoordinator;

        if (notes) {
            meetingFields.notes = notes;
        } else {
            meetingFields.notes = '';
        }
        if (newcomers) {
            meetingFields.newcomers = newcomers;
        } else {
            meetingFields.newcomers = 0;
        }
        if (nursery) {
            meetingFields.nursery = nursery;
        } else {
            meetingFields.nursery = 0;
        }
        if (children) {
            meetingFields.children = children;
        } else {
            meetingFields.children = 0;
        }
        if (youth) {
            meetingFields.youth = youth;
        } else {
            meetingFields.youth = 0;
        }
        try {
            // Using upsert option (creates new doc if no match is found):
            if (meetingId) {
                let meeting = await Meeting.findOneAndUpdate(
                    { _id: meetingId },
                    { $set: meetingFields },
                    { new: true, upsert: true }
                );
                res.json(meeting);
            } else {
                // we are going to do insert...
                let meeting2 = await Meeting.findOneAndUpdate(
                    { facilitator: 'aBrandNewEntry' },
                    { $set: meetingFields },
                    { new: true, upsert: true, returnNewDocument: true }
                );
                res.json(meeting2);
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
        // }
    }
);

// @route    GET api/meeting
// @desc     Get all meetings
// @access   Public
router.get('/', async (req, res) => {
    try {
        const meetings = await Meeting.find()
            .sort({ meetingDate: 1 })
            .populate('humans', ['name']);
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/meeting/future
// @desc     Get all meetings today and future
// @access   Public
router.get('/future', async (req, res) => {
    try {
        var tDay = new Date();
        console.log('tDay:' + tDay);
        const meetings = await Meeting.find({
            meetingDate: { $gte: tDay },
        }).sort({ meetingDate: 0 });
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/meeting/future
// @desc     Get all meetings today and future
// @access   Public
router.get('/future/:cid', async (req, res) => {
    try {
        // need to create the tenant value
        let client = 'meeting-' + req.params.cid;

        // need to create special date for today starting at T00:00:00.000Z
        let tDate = new Date();
        let numMonth = tDate.getMonth() + 1;
        let tmpMonth = numMonth.toString();
        let tmpDay = tDate.getDate().toString();
        let tMonth = '';
        let tDay = '';
        if (tmpMonth.length < 2) {
            tMonth = '0' + tmpMonth;
        } else {
            tMonth = tmpMonth;
        }
        if (tmpDay.length < 2) {
            tDay = '0' + tmpDay;
        } else {
            tDay = tmpDay;
        }
        let tYear = tDate.getFullYear();
        let target = tYear + '-' + tMonth + '-' + tDay + 'T00:00:00.000Z';

        const meetings = await Meeting.find({
            meetingDate: { $gte: target },
            tenantId: client,
        }).sort({ meetingDate: 0 });
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/meeting/history
// @desc     Get all meetings today and future
// @access   Public
router.get('/history', async (req, res) => {
    try {
        var tDay = new Date();
        const meetings = await Meeting.find({
            meetingDate: { $lt: tDay },
        }).sort({ meetingDate: -1 });
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    GET api/meeting/history
// @desc     Get all meetings today and future
// @access   Public
router.get('/history/:cid', async (req, res) => {
    try {
        // console.log('/history/:cid');
        let client = 'meeting-' + req.params.cid;

        // need to create special date for today starting at T00:00:00.000Z
        let tDate = new Date();
        let numMonth = tDate.getMonth() + 1;
        let tmpMonth = numMonth.toString();
        let tmpDay = tDate.getDate().toString();
        let tMonth = '';
        let tDay = '';
        if (tmpMonth.length < 2) {
            tMonth = '0' + tmpMonth;
        } else {
            tMonth = tmpMonth;
        }
        if (tmpDay.length < 2) {
            tDay = '0' + tmpDay;
        } else {
            tDay = tmpDay;
        }
        let tYear = tDate.getFullYear();
        let target = tYear + '-' + tMonth + '-' + tDay + 'T00:00:00.000Z';

        const meetings = await Meeting.find({
            meetingDate: { $lt: target },
            tenantId: client,
        }).sort({ meetingDate: -1 });
        res.json(meetings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// new inline getMeeting....
// @route    GET api/meeting/:id
// @desc     Get meeting by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !meeting) {
            return res.status(404).json({ msg: 'Meeting not found' });
        }

        res.json(meeting);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    GET api/meeting/:meetingId
// @desc     Get profile by user ID
// @access   Public
// router.get('/:meetingId', async (req, res) => {
//   try {
//     const meeting = await Meeting.findOne({
//       _id: req.params.meetingId

//     if (!meeting) return res.status(400).json({ msg: 'Meeting not found' });

//     res.json(meeting);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'Profile not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

// @route    DELETE api/meeting
// @desc     Delete meeting
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove profile
        await Meeting.findOneAndRemove({ _id: req.params.id });
        const feedback = 'Meeting deleted (' + req.params.id + ')';
        res.json({ msg: feedback });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
// router.delete('/experience/:exp_id', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });

//     // Get remove index
//     const removeIndex = profile.experience
//       .map(item => item.id)
//       .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex, 1);

//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        //const foundProfile = await Profile.findOneAndUpdate( { user: req.user.id },
        //  { $pull: { experience: { _id: req.params.exp_id }}},
        //  {new: true});
        const foundProfile = await Profile.findOne({ user: req.user.id });

        // Filter exprience array using _id (NOTE: _id is a BSON type needs to be converted to string)
        // This can also be omitted and the next line and findOneAndUpdate to be used instead (above implementation)
        foundProfile.experience = foundProfile.experience.filter(
            (exp) => exp._id.toString() !== req.params.exp_id
        );

        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// @route    PUT api/meeting/group
// @desc     Add meeting group
// @access   Private
router.put(
    '/group',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('grpGender', 'Gender is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            attendance,
            gender,
            location,
            facilitator,
            cofacilitator,
            notes,
        } = req.body;

        const newGrp = {
            title,
            attendance,
            gender,
            location,
            facilitator,
            cofacilitator,
            notes,
        };

        try {
            const meeting = await Meeting.findOne({ _id: req.meetingId });

            meeting.groups.unshift(newGroup);

            await meeting.save();

            res.json(meeting);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
// end PUT Group

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
//router.delete('/education/:edu_id', auth, async (req, res) => {
//try {
//const profile = await Profile.findOne({ user: req.user.id });

// Get remove index
//const removeIndex = profile.education
//.map(item => item.id)
//.indexOf(req.params.edu_id);
/*
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/

router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        const eduIds = foundProfile.education.map((edu) => edu._id.toString());
        // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /education/5
        const removeIndex = eduIds.indexOf(req.params.edu_id);
        if (removeIndex === -1) {
            return res.status(500).json({ msg: 'Server error' });
        } else {
            // theses console logs helped me figure it out
            /*   console.log("eduIds", eduIds);
      console.log("typeof eduIds", typeof eduIds);
      console.log("req.params", req.params);
      console.log("removed", eduIds.indexOf(req.params.edu_id));
 */ foundProfile.education.splice(
                removeIndex,
                1
            );
            await foundProfile.save();
            return res.status(200).json(foundProfile);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: encodeURI(
                `https://api.github.com/users/${
                    req.params.username
                }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                    'githubClientId'
                )}&client_secret=${config.get('githubSecret')}`
            ),
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route    PUT api/meeting/groups
// @desc     Get groups for a meeting
// @access   Private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;

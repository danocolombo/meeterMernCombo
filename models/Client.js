const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    connection: {
        type: String,
    },
    users: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            role: {
                type: String,
            },
            status: {
                type: String,
            },
        },
    ],
    mConfigs: [
        {
            config: {
                type: String,
            },
            value: {
                type: Boolean
            }
        }
    ],
    defaultGroups: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
            },
            gender: {
                type: String,
            },
            title: {
                type: String,
            },
            location: {
                type: String,
            },
            facilitator: {
                type: String,
            },
        },
    ],
    meetingConfig: {
        setupContact: {
            type: Boolean,
        },
        transportationContact: {
            type: Boolean,
        },
        transportationCnt: {
            type: Boolean,
        },
        avContact: {
            type: Boolean,
        },
        greeterContact1: {
            type: Boolean,
        },
        greeterContact2: {
            type: Boolean,
        },
        resourceContact: {
            type: Boolean,
        },
        announcementsContact: {
            type: Boolean,
        },
        closingContact: {
            type: Boolean,
        },
        mealCnt: {
            type: Boolean,
        },
        meal: {
            type: Boolean,
        },
        mealCoordinator: {
            type: Boolean,
        },
        cafeCnt: {
            type: Boolean,
        },
        cafeCoordinator: {
            type: Boolean,
        },
        nursery: {
            type: Boolean,
        },
        nurseryContact: {
            type: Boolean,
        },
        children: {
            type: Boolean,
        },
        childrenContact: {
            type: Boolean,
        },
        youth: {
            type: Boolean,
        },
        youthContact: {
            type: Boolean,
        },
        donations: {
            type: Boolean,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Client = mongoose.model('client', ClientSchema);

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
    defaultGroups: [
        {
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
        donations: {
            type: Boolean,
        },
        cafe: {
            type: Boolean,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Client = mongoose.model('client', ClientSchema);

const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tenantId: {
        type: String,
    },
    meetingDate: {
        type: Date,
        required: true,
    },
    meetingType: {
        type: String,
        required: true,
    },
    worship: {
        type: String,
    },
    facilitator: {
        type: String,
    },
    supportRole: {
        type: String,
    },
    meal: {
        type: String,
    },
    mealCount: {
        type: Number,
    },
    mealCoordinator: {
        type: String,
    },
    cafeCoordinator: {
        type: String,
    },
    attendance: {
        type: Number,
    },
    donations: {
        type: Number,
    },
    nursery: {
        type: Number,
    },
    children: {
        type: Number,
    },
    youth: {
        type: Number,
    },
    newcomers: {
        type: Number,
    },
    notes: {
        type: String,
    },
    groups: [
        {
            title: {
                type: String,
            },
            location: {
                type: String,
            },
            facilitator: {
                type: String,
            },
            cofacilitator: {
                type: String,
            },
            gender: {
                type: String,
            },
            attendance: {
                type: Number,
            },
            notes: {
                type: String,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Meeting = mongoose.model('meeting', MeetingSchema);

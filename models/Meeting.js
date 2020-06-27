const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
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
    facilitator: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    supportRole: {
        type: String,
    },
    worship: {
        type: String,
    },
    avContact: {
        type: String,
    },
    attendance: {
        type: Number,
    },
    donations: {
        type: Number,
    },
    meal: {
        type: String,
    },
    mealCnt: {
        type: Number,
    },
    mealCoordinator: {
        type: String,
    },
    cafeCount: {
        type: String,
    },
    cafeCoordinator: {
        type: String,
    },
    greeterContact1: {
        type: String,
    },
    greeterContact2: {
        type: String,
    },
    resourceContact: {
        type: String,
    },
    announcementsContact: {
        type: String,
    },
    securityContact: {
        type: String,
    },
    closingContact: {
        type: String,
    },
    setupContact: {
        type: String,
    },
    cleanupContact: {
        type: String,
    },
    transportationContact: {
        type: String,
    },
    transportationCount: {
        type: Number,
    },
    nurseryContact: {
        type: String,
    },
    nursery: {
        type: Number,
    },
    childrenContact: {
        type: String,
    },
    children: {
        type: Number,
    },
    youthContact: {
        type: String,
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

const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tenantId: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    gender: {
        type: String,
    },
    shirtSize: {
        type: String,
    },
    birthday: {
        type: String,
    },
    service: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    training: [
        {
            title: {
                type: String,
                required: true,
            },
            trainingDate: {
                type: Date,
                required: true,
            },
        },
    ],
    notes: {
        type: String,
    },
});
module.exports = People = mongoose.model('people', PeopleSchema);

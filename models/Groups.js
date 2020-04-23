const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    mid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        default: 0
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    facilitator: {
        type: String
    },
    cofacilitator: {
        type: String
    },
    notes: {
        type: String
    }
});

module.exports = Groups = mongoose.model('groups', GroupSchema);

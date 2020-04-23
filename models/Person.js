const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    shirtSize: {
        type: String
    },
    birthday: {
        type: String
    },
    service: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    training: [
        {
            title: {
                type: String,
                required: true
            },
            trainingDate: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = Person = mongoose.model('person', PersonSchema);

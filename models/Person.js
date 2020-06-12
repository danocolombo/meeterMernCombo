const mongoose = require('mongoose');
const { tenantModel } = require('../lib/multiTenant');
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
});
module.exports = Person = tenantModel('people', PersonSchema);
//module.exports = Person = mongoose.model('person', PersonSchema);

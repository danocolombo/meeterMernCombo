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
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Client = mongoose.model('client', ClientSchema);

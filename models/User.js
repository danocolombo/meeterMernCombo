const mongoose = require('mongoose');
// const { teanantModel } = require("../lib/multiTenant");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    defaultClient: {
        type: String,
    },
    activeClient: {
        type: String,
        default: 'undefined',
    },
    activeRole: {
        type: String,
        default: 'owner',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', UserSchema);

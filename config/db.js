const aws = require('aws-sdk');
const mongoose = require('mongoose');
const config = require('config');
const DEBUG = true;
let db = config.get('mongoURI');

const connectDB = async () => {
    if (!DEBUG) db = process.env.DB_CONN;
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;

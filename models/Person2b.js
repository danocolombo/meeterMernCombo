const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  status: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Person = mongoose.model('person', PersonSchema);

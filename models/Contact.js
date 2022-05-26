const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  contact: {
    type: String,
    required: [true, 'Please provide a contact number'],
    unique: true,
  },
});

module.exports = mongoose.model('Contact', contactSchema);

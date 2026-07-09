const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true
  },
  issue: {
    type: String,
    required: [true, 'Please select or describe the issue'],
    enum: ['emergency', 'clog', 'leak', 'heater', 'install']
  },
  estimateMin: {
    type: Number,
    default: 0
  },
  estimateMax: {
    type: Number,
    default: 0
  },
  details: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Contact', 'Scheduled', 'Resolved', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lead', LeadSchema);

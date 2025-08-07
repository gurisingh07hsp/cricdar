const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  seriesId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['test', 'odi', 't20', 't20i'],
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  teams: [{
    id: String,
    name: String,
    shortName: String,
    flag: String
  }],
  matches: [{
    matchId: String,
    name: String,
    date: Date,
    status: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  externalId: {
    cricbuzz: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Series', seriesSchema); 
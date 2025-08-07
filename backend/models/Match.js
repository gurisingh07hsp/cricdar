const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  matchType: {
    type: String,
    enum: ['test', 'odi', 't20', 't20i', 'first-class', 'list-a'],
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'cancelled', 'postponed'],
    default: 'upcoming'
  },
  venue: {
    name: String,
    city: String,
    country: String,
    capacity: Number
  },
  date: {
    type: Date,
    required: true
  },
  teams: [{
    id: String,
    name: String,
    shortName: String,
    flag: String
  }],
  toss: {
    winner: String,
    decision: String
  },
  scores: [{
    teamId: String,
    teamName: String,
    innings: Number,
    runs: Number,
    wickets: Number,
    overs: Number,
    runRate: Number,
    extras: {
      wides: Number,
      noBalls: Number,
      byes: Number,
      legByes: Number
    }
  }],
  currentInnings: {
    type: Number,
    default: 1
  },
  result: {
    winner: String,
    margin: String,
    method: String
  },
  players: [{
    id: String,
    name: String,
    teamId: String,
    role: String,
    battingStyle: String,
    bowlingStyle: String
  }],
  highlights: [{
    type: String,
    description: String,
    timestamp: Date
  }],
  commentary: [{
    over: Number,
    ball: Number,
    text: String,
    timestamp: Date
  }],
  weather: {
    temperature: Number,
    humidity: Number,
    conditions: String
  },
  pitchReport: {
    type: String,
    default: null
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  externalId: {
    cricbuzz: String,
    espn: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for match duration
matchSchema.virtual('duration').get(function() {
  if (this.date) {
    const now = new Date();
    const diff = now - this.date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h ago`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  }
  return null;
});

// Virtual for isLive
matchSchema.virtual('isLive').get(function() {
  return this.status === 'live';
});

// Virtual for isCompleted
matchSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Virtual for currentScore
matchSchema.virtual('currentScore').get(function() {
  if (this.scores && this.scores.length > 0) {
    const latestScore = this.scores[this.scores.length - 1];
    return `${latestScore.runs}/${latestScore.wickets} (${latestScore.overs} overs)`;
  }
  return null;
});

// Indexes for better query performance
matchSchema.index({ matchId: 1 });
matchSchema.index({ status: 1 });
matchSchema.index({ date: -1 });
matchSchema.index({ 'teams.name': 1 });
matchSchema.index({ isFeatured: 1 });
matchSchema.index({ matchType: 1 });
matchSchema.index({ 'venue.city': 1 });

// Static method to find live matches
matchSchema.statics.findLiveMatches = function() {
  return this.find({ status: 'live' })
    .sort({ date: -1 })
    .limit(20);
};

// Static method to find upcoming matches
matchSchema.statics.findUpcomingMatches = function(limit = 20) {
  return this.find({ 
    status: 'upcoming',
    date: { $gte: new Date() }
  })
    .sort({ date: 1 })
    .limit(limit);
};

// Static method to find completed matches
matchSchema.statics.findCompletedMatches = function(limit = 20) {
  return this.find({ status: 'completed' })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to find matches by team
matchSchema.statics.findByTeam = function(teamName) {
  return this.find({
    'teams.name': { $regex: teamName, $options: 'i' }
  })
    .sort({ date: -1 });
};

// Instance method to update score
matchSchema.methods.updateScore = function(teamId, runs, wickets, overs) {
  const scoreIndex = this.scores.findIndex(score => score.teamId === teamId);
  
  if (scoreIndex !== -1) {
    this.scores[scoreIndex].runs = runs;
    this.scores[scoreIndex].wickets = wickets;
    this.scores[scoreIndex].overs = overs;
    this.scores[scoreIndex].runRate = overs > 0 ? (runs / overs).toFixed(2) : 0;
  }
  
  this.lastUpdated = new Date();
  return this.save();
};

// Instance method to add commentary
matchSchema.methods.addCommentary = function(over, ball, text) {
  this.commentary.push({
    over,
    ball,
    text,
    timestamp: new Date()
  });
  
  this.lastUpdated = new Date();
  return this.save();
};

module.exports = mongoose.model('Match', matchSchema); 
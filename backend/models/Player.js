const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  nickName: {
    type: String,
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  birthPlace: {
    type: String,
    trim: true
  },
  height: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 'Wicket-keeper batsman'],
    default: 'Batsman'
  },
  battingStyle: {
    type: String,
    trim: true
  },
  bowlingStyle: {
    type: String,
    trim: true
  },
  internationalTeam: {
    type: String,
    trim: true
  },
  teams: [{
    teamId: String,
    teamName: String,
    role: String,
    fromYear: Number,
    toYear: Number
  }],
  image: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  rankings: {
    batting: {
      test: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      odi: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      t20: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      }
    },
    bowling: {
      test: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      odi: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      t20: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      }
    },
    allRounder: {
      test: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      odi: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      },
      t20: {
        rank: Number,
        rating: Number,
        bestRank: Number,
        bestRating: Number
      }
    }
  },
  statistics: {
    batting: {
      test: {
        matches: Number,
        innings: Number,
        runs: Number,
        average: Number,
        strikeRate: Number,
        hundreds: Number,
        fifties: Number,
        highestScore: Number
      },
      odi: {
        matches: Number,
        innings: Number,
        runs: Number,
        average: Number,
        strikeRate: Number,
        hundreds: Number,
        fifties: Number,
        highestScore: Number
      },
      t20: {
        matches: Number,
        innings: Number,
        runs: Number,
        average: Number,
        strikeRate: Number,
        hundreds: Number,
        fifties: Number,
        highestScore: Number
      }
    },
    bowling: {
      test: {
        matches: Number,
        innings: Number,
        wickets: Number,
        average: Number,
        economy: Number,
        strikeRate: Number,
        bestBowling: String,
        fiveWickets: Number,
        tenWickets: Number
      },
      odi: {
        matches: Number,
        innings: Number,
        wickets: Number,
        average: Number,
        economy: Number,
        strikeRate: Number,
        bestBowling: String,
        fiveWickets: Number
      },
      t20: {
        matches: Number,
        innings: Number,
        wickets: Number,
        average: Number,
        economy: Number,
        strikeRate: Number,
        bestBowling: String,
        fiveWickets: Number
      }
    }
  },
  recentForm: [{
    matchType: String,
    matchId: String,
    matchName: String,
    date: Date,
    runs: Number,
    wickets: Number,
    performance: String
  }],
  achievements: [{
    title: String,
    description: String,
    year: Number,
    category: String
  }],
  awards: [{
    name: String,
    year: Number,
    category: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isRetired: {
    type: Boolean,
    default: false
  },
  retirementDate: {
    type: Date,
    default: null
  },
  externalId: {
    cricbuzz: String,
    espn: String,
    icc: String
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

// Virtual for age
playerSchema.virtual('age').get(function() {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
  return null;
});

// Virtual for experience
playerSchema.virtual('experience').get(function() {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0) {
      return `${years - 1} years, ${12 + months} months`;
    }
    
    return `${years} years, ${months} months`;
  }
  return null;
});

// Virtual for isRetired
playerSchema.virtual('isRetiredPlayer').get(function() {
  return this.isRetired || (this.retirementDate && this.retirementDate < new Date());
});

// Indexes for better query performance
playerSchema.index({ playerId: 1 });
playerSchema.index({ name: 1 });
playerSchema.index({ role: 1 });
playerSchema.index({ internationalTeam: 1 });
playerSchema.index({ isActive: 1 });
playerSchema.index({ isRetired: 1 });
playerSchema.index({ 'teams.teamName': 1 });

// Static method to find active players
playerSchema.statics.findActivePlayers = function() {
  return this.find({ isActive: true, isRetired: false })
    .sort({ name: 1 });
};

// Static method to find players by team
playerSchema.statics.findByTeam = function(teamName) {
  return this.find({
    'teams.teamName': { $regex: teamName, $options: 'i' },
    isActive: true
  })
    .sort({ name: 1 });
};

// Static method to find players by role
playerSchema.statics.findByRole = function(role) {
  return this.find({
    role: role,
    isActive: true
  })
    .sort({ name: 1 });
};

// Static method to find top batsmen
playerSchema.statics.findTopBatsmen = function(format = 'test', limit = 10) {
  return this.find({
    isActive: true,
    [`statistics.batting.${format}.runs`]: { $gt: 0 }
  })
    .sort({ [`statistics.batting.${format}.runs`]: -1 })
    .limit(limit);
};

// Static method to find top bowlers
playerSchema.statics.findTopBowlers = function(format = 'test', limit = 10) {
  return this.find({
    isActive: true,
    [`statistics.bowling.${format}.wickets`]: { $gt: 0 }
  })
    .sort({ [`statistics.bowling.${format}.wickets`]: -1 })
    .limit(limit);
};

// Instance method to update statistics
playerSchema.methods.updateStatistics = function(format, type, stats) {
  if (this.statistics[type] && this.statistics[type][format]) {
    Object.assign(this.statistics[type][format], stats);
    this.lastUpdated = new Date();
    return this.save();
  }
  return Promise.reject(new Error('Invalid format or type'));
};

// Instance method to add recent form
playerSchema.methods.addRecentForm = function(formData) {
  this.recentForm.unshift(formData);
  
  // Keep only last 20 recent form entries
  if (this.recentForm.length > 20) {
    this.recentForm = this.recentForm.slice(0, 20);
  }
  
  this.lastUpdated = new Date();
  return this.save();
};

module.exports = mongoose.model('Player', playerSchema); 
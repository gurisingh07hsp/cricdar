const express = require('express');
const axios = require('axios');
const { query } = require('express-validator');
const Match = require('../models/Match');
const Player = require('../models/Player');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Cricbuzz API configuration
const CRICBUZZ_API_KEY = process.env.CRICBUZZ_API_KEY;
const CRICBUZZ_API_HOST = process.env.CRICBUZZ_API_HOST;

// Helper function to make Cricbuzz API requests
const makeCricbuzzRequest = async (endpoint) => {
  try {
    const response = await axios.get(`https://${CRICBUZZ_API_HOST}${endpoint}`, {
      headers: {
        'x-rapidapi-host': CRICBUZZ_API_HOST,
        'x-rapidapi-key': CRICBUZZ_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Cricbuzz API error:', error.response?.data || error.message);
    throw new Error('Failed to fetch data from Cricbuzz API');
  }
};

// @route   GET /api/cricket/live-matches
// @desc    Get live matches from Cricbuzz API
// @access  Public
router.get('/live-matches', async (req, res) => {
  try {
    const data = await makeCricbuzzRequest('/matches/v1/live');
    
    // Transform the data to match our schema
    const matches = data.matches?.map(match => ({
      matchId: match.id,
      name: match.name,
      matchType: match.matchType,
      status: match.status,
      venue: {
        name: match.venue?.name,
        city: match.venue?.city,
        country: match.venue?.country
      },
      date: new Date(match.startDate),
      teams: match.teams?.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName
      })) || [],
      scores: match.score?.map(score => ({
        teamId: score.inningId,
        teamName: score.rTitle,
        innings: score.inningId,
        runs: score.r,
        wickets: score.w,
        overs: score.o,
        runRate: score.rr
      })) || []
    })) || [];

    res.json({
      success: true,
      data: {
        matches,
        count: matches.length
      }
    });
  } catch (error) {
    console.error('Get live matches error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch live matches'
    });
  }
});

// @route   GET /api/cricket/upcoming-matches
// @desc    Get upcoming matches from Cricbuzz API
// @access  Public
router.get('/upcoming-matches', [
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const data = await makeCricbuzzRequest('/matches/v1/upcoming');
    
    // Transform the data to match our schema
    const matches = data.matches?.slice(0, limit).map(match => ({
      matchId: match.id,
      name: match.name,
      matchType: match.matchType,
      status: 'upcoming',
      venue: {
        name: match.venue?.name,
        city: match.venue?.city,
        country: match.venue?.country
      },
      date: new Date(match.startDate),
      teams: match.teams?.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName
      })) || []
    })) || [];

    res.json({
      success: true,
      data: {
        matches,
        count: matches.length
      }
    });
  } catch (error) {
    console.error('Get upcoming matches error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch upcoming matches'
    });
  }
});

// @route   GET /api/cricket/match/:matchId
// @desc    Get match details from Cricbuzz API
// @access  Public
router.get('/match/:matchId', [
  query('matchId').isString().notEmpty()
], async (req, res) => {
  try {
    const { matchId } = req.params;
    const data = await makeCricbuzzRequest(`/mcenter/v1/${matchId}`);
    
    // Transform the data to match our schema
    const match = {
      matchId: data.id,
      name: data.name,
      matchType: data.matchType,
      status: data.status,
      venue: {
        name: data.venue?.name,
        city: data.venue?.city,
        country: data.venue?.country
      },
      date: new Date(data.startDate),
      teams: data.teams?.map(team => ({
        id: team.id,
        name: team.name,
        shortName: team.shortName
      })) || [],
      scores: data.score?.map(score => ({
        teamId: score.inningId,
        teamName: score.rTitle,
        innings: score.inningId,
        runs: score.r,
        wickets: score.w,
        overs: score.o,
        runRate: score.rr
      })) || [],
      toss: data.toss,
      result: data.result,
      players: data.players?.map(player => ({
        id: player.id,
        name: player.name,
        teamId: player.teamId,
        role: player.role
      })) || []
    };

    res.json({
      success: true,
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Get match details error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch match details'
    });
  }
});

// @route   GET /api/cricket/match/:matchId/scorecard
// @desc    Get match scorecard from Cricbuzz API
// @access  Public
router.get('/match/:matchId/scorecard', [
  query('matchId').isString().notEmpty()
], async (req, res) => {
  try {
    const { matchId } = req.params;
    const data = await makeCricbuzzRequest(`/mcenter/v1/${matchId}/scard`);
    
    res.json({
      success: true,
      data: {
        scorecard: data
      }
    });
  } catch (error) {
    console.error('Get scorecard error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch scorecard'
    });
  }
});

// @route   GET /api/cricket/player/:playerId
// @desc    Get player details from Cricbuzz API
// @access  Public
router.get('/player/:playerId', [
  query('playerId').isString().notEmpty()
], async (req, res) => {
  try {
    const { playerId } = req.params;
    const data = await makeCricbuzzRequest(`/stats/v1/player/${playerId}`);
    
    // Transform the data to match our schema
    const player = {
      playerId: data.id,
      name: data.name,
      nickName: data.nickName,
      fullName: data.name,
      dateOfBirth: data.DoB ? new Date(data.DoB) : null,
      birthPlace: data.birthPlace,
      height: data.height,
      role: data.role,
      battingStyle: data.bat,
      bowlingStyle: data.bowl,
      internationalTeam: data.intlTeam,
      image: data.image,
      bio: data.bio,
      teams: data.teamNameIds?.map(team => ({
        teamId: team.teamId,
        teamName: team.teamName
      })) || [],
      rankings: data.rankings || {},
      isActive: true
    };

    res.json({
      success: true,
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Get player details error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch player details'
    });
  }
});

// @route   POST /api/cricket/sync-matches
// @desc    Sync matches from Cricbuzz API to database
// @access  Private (Admin only)
router.post('/sync-matches', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    // Get live matches from Cricbuzz
    const liveData = await makeCricbuzzRequest('/matches/v1/live');
    const upcomingData = await makeCricbuzzRequest('/matches/v1/upcoming');
    
    const allMatches = [
      ...(liveData.matches || []),
      ...(upcomingData.matches || [])
    ];

    let syncedCount = 0;
    let updatedCount = 0;

    for (const matchData of allMatches) {
      const matchDoc = {
        matchId: matchData.id,
        name: matchData.name,
        matchType: matchData.matchType,
        status: matchData.status || 'upcoming',
        venue: {
          name: matchData.venue?.name,
          city: matchData.venue?.city,
          country: matchData.venue?.country
        },
        date: new Date(matchData.startDate),
        teams: matchData.teams?.map(team => ({
          id: team.id,
          name: team.name,
          shortName: team.shortName
        })) || [],
        externalId: {
          cricbuzz: matchData.id
        },
        lastUpdated: new Date()
      };

      // Check if match exists
      const existingMatch = await Match.findOne({ matchId: matchData.id });
      
      if (existingMatch) {
        // Update existing match
        Object.assign(existingMatch, matchDoc);
        await existingMatch.save();
        updatedCount++;
      } else {
        // Create new match
        const newMatch = new Match(matchDoc);
        await newMatch.save();
        syncedCount++;
      }
    }

    res.json({
      success: true,
      message: 'Matches synced successfully',
      data: {
        synced: syncedCount,
        updated: updatedCount,
        total: syncedCount + updatedCount
      }
    });
  } catch (error) {
    console.error('Sync matches error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to sync matches'
    });
  }
});

// @route   POST /api/cricket/sync-players
// @desc    Sync players from Cricbuzz API to database
// @access  Private (Admin only)
router.post('/sync-players', [
  authenticateToken,
  requireAdmin,
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Get top players from different formats
    const formats = ['test', 'odi', 't20'];
    const playerIds = new Set();
    
    for (const format of formats) {
      try {
        const data = await makeCricbuzzRequest(`/stats/v1/rankings/${format}`);
        const players = data.rank || [];
        
        players.slice(0, Math.floor(limit / formats.length)).forEach(player => {
          if (player.id) {
            playerIds.add(player.id);
          }
        });
      } catch (error) {
        console.error(`Failed to fetch ${format} rankings:`, error);
      }
    }

    let syncedCount = 0;
    let updatedCount = 0;

    for (const playerId of playerIds) {
      try {
        const playerData = await makeCricbuzzRequest(`/stats/v1/player/${playerId}`);
        
        const playerDoc = {
          playerId: playerData.id,
          name: playerData.name,
          nickName: playerData.nickName,
          fullName: playerData.name,
          dateOfBirth: playerData.DoB ? new Date(playerData.DoB) : null,
          birthPlace: playerData.birthPlace,
          height: playerData.height,
          role: playerData.role,
          battingStyle: playerData.bat,
          bowlingStyle: playerData.bowl,
          internationalTeam: playerData.intlTeam,
          image: playerData.image,
          bio: playerData.bio,
          teams: playerData.teamNameIds?.map(team => ({
            teamId: team.teamId,
            teamName: team.teamName
          })) || [],
          rankings: playerData.rankings || {},
          isActive: true,
          externalId: {
            cricbuzz: playerData.id
          },
          lastUpdated: new Date()
        };

        // Check if player exists
        const existingPlayer = await Player.findOne({ playerId: playerData.id });
        
        if (existingPlayer) {
          // Update existing player
          Object.assign(existingPlayer, playerDoc);
          await existingPlayer.save();
          updatedCount++;
        } else {
          // Create new player
          const newPlayer = new Player(playerDoc);
          await newPlayer.save();
          syncedCount++;
        }
      } catch (error) {
        console.error(`Failed to sync player ${playerId}:`, error);
      }
    }

    res.json({
      success: true,
      message: 'Players synced successfully',
      data: {
        synced: syncedCount,
        updated: updatedCount,
        total: syncedCount + updatedCount
      }
    });
  } catch (error) {
    console.error('Sync players error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to sync players'
    });
  }
});

// @route   GET /api/cricket/search
// @desc    Search matches and players
// @access  Public
router.get('/search', [
  query('q').isString().notEmpty().withMessage('Search query is required'),
  query('type').optional().isIn(['matches', 'players', 'all']),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { q, type = 'all', limit = 20 } = req.query;
    
    const results = {
      matches: [],
      players: []
    };

    if (type === 'all' || type === 'matches') {
      const matches = await Match.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { 'teams.name': { $regex: q, $options: 'i' } },
          { 'venue.name': { $regex: q, $options: 'i' } }
        ]
      })
        .limit(parseInt(limit))
        .lean();
      
      results.matches = matches;
    }

    if (type === 'all' || type === 'players') {
      const players = await Player.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { nickName: { $regex: q, $options: 'i' } },
          { internationalTeam: { $regex: q, $options: 'i' } },
          { 'teams.teamName': { $regex: q, $options: 'i' } }
        ]
      })
        .limit(parseInt(limit))
        .lean();
      
      results.players = players;
    }

    res.json({
      success: true,
      data: {
        query: q,
        results,
        total: results.matches.length + results.players.length
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
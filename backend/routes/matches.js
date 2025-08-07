const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Match = require('../models/Match');
const { authenticateToken, requireAdmin, requireModerator } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/matches
// @desc    Get all matches with filtering and pagination
// @access  Public
router.get('/', [
  query('status').optional().isIn(['upcoming', 'live', 'completed', 'cancelled', 'postponed']),
  query('matchType').optional().isIn(['test', 'odi', 't20', 't20i', 'first-class', 'list-a']),
  query('team').optional().isString(),
  query('venue').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort').optional().isIn(['date', '-date', 'name', '-name']),
  query('featured').optional().isBoolean()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      status,
      matchType,
      team,
      venue,
      page = 1,
      limit = 20,
      sort = '-date',
      featured
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    if (matchType) {
      filter.matchType = matchType;
    }
    if (featured !== undefined) {
      filter.isFeatured = featured === 'true';
    }
    
    if (team) {
      filter['teams.name'] = { $regex: team, $options: 'i' };
    }
    
    if (venue) {
      filter['venue.name'] = { $regex: venue, $options: 'i' };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const matches = await Match.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Match.countDocuments(filter);

    res.json({
      success: true,
      data: {
        matches,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/matches/live
// @desc    Get live matches
// @access  Public
router.get('/live', async (req, res) => {
  try {
    const matches = await Match.findLiveMatches();
    
    res.json({
      success: true,
      data: {
        matches
      }
    });
  } catch (error) {
    console.error('Get live matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/matches/upcoming
// @desc    Get upcoming matches
// @access  Public
router.get('/upcoming', [
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const matches = await Match.findUpcomingMatches(parseInt(limit));
    
    res.json({
      success: true,
      data: {
        matches
      }
    });
  } catch (error) {
    console.error('Get upcoming matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/matches/completed
// @desc    Get completed matches
// @access  Public
router.get('/completed', [
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const matches = await Match.findCompletedMatches(parseInt(limit));
    
    res.json({
      success: true,
      data: {
        matches
      }
    });
  } catch (error) {
    console.error('Get completed matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/matches/:matchId
// @desc    Get match by ID
// @access  Public
router.get('/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;
    
    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.json({
      success: true,
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/matches
// @desc    Create a new match
// @access  Private (Admin/Moderator)
router.post('/', [
  authenticateToken,
  requireModerator,
  body('matchId').notEmpty().withMessage('Match ID is required'),
  body('name').notEmpty().withMessage('Match name is required'),
  body('matchType').isIn(['test', 'odi', 't20', 't20i', 'first-class', 'list-a']).withMessage('Invalid match type'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('teams').isArray({ min: 2, max: 2 }).withMessage('Exactly 2 teams are required'),
  body('teams.*.id').notEmpty().withMessage('Team ID is required'),
  body('teams.*.name').notEmpty().withMessage('Team name is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const matchData = req.body;

    // Check if match already exists
    const existingMatch = await Match.findOne({ matchId: matchData.matchId });
    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: 'Match with this ID already exists'
      });
    }

    const match = new Match(matchData);
    await match.save();

    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Create match error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/matches/:matchId
// @desc    Update match
// @access  Private (Admin/Moderator)
router.put('/:matchId', [
  authenticateToken,
  requireModerator,
  body('status').optional().isIn(['upcoming', 'live', 'completed', 'cancelled', 'postponed']),
  body('matchType').optional().isIn(['test', 'odi', 't20', 't20i', 'first-class', 'list-a']),
  body('date').optional().isISO8601(),
  body('isFeatured').optional().isBoolean()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { matchId } = req.params;
    const updateData = req.body;

    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    // Update fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        match[key] = updateData[key];
      }
    });

    match.lastUpdated = new Date();
    await match.save();

    res.json({
      success: true,
      message: 'Match updated successfully',
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Update match error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/matches/:matchId
// @desc    Delete match
// @access  Private (Admin only)
router.delete('/:matchId', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const { matchId } = req.params;
    
    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    await Match.deleteOne({ matchId });

    res.json({
      success: true,
      message: 'Match deleted successfully'
    });
  } catch (error) {
    console.error('Delete match error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/matches/:matchId/score
// @desc    Update match score
// @access  Private (Admin/Moderator)
router.put('/:matchId/score', [
  authenticateToken,
  requireModerator,
  body('teamId').notEmpty().withMessage('Team ID is required'),
  body('runs').isInt({ min: 0 }).withMessage('Runs must be a non-negative integer'),
  body('wickets').isInt({ min: 0, max: 10 }).withMessage('Wickets must be between 0 and 10'),
  body('overs').isFloat({ min: 0 }).withMessage('Overs must be a non-negative number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { matchId } = req.params;
    const { teamId, runs, wickets, overs } = req.body;

    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    await match.updateScore(teamId, runs, wickets, overs);

    res.json({
      success: true,
      message: 'Score updated successfully',
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Update score error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/matches/:matchId/commentary
// @desc    Add commentary to match
// @access  Private (Admin/Moderator)
router.post('/:matchId/commentary', [
  authenticateToken,
  requireModerator,
  body('over').isInt({ min: 1 }).withMessage('Over must be a positive integer'),
  body('ball').isInt({ min: 1, max: 6 }).withMessage('Ball must be between 1 and 6'),
  body('text').notEmpty().withMessage('Commentary text is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { matchId } = req.params;
    const { over, ball, text } = req.body;

    const match = await Match.findOne({ matchId });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    await match.addCommentary(over, ball, text);

    res.json({
      success: true,
      message: 'Commentary added successfully',
      data: {
        match
      }
    });
  } catch (error) {
    console.error('Add commentary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
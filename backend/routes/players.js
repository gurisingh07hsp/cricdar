const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Player = require('../models/Player');
const { authenticateToken, requireAdmin, requireModerator } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/players
// @desc    Get all players with filtering and pagination
// @access  Public
router.get('/', [
  query('role').optional().isIn(['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 'Wicket-keeper batsman']),
  query('team').optional().isString(),
  query('country').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort').optional().isIn(['name', '-name', 'role', '-role']),
  query('active').optional().isBoolean()
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
      role,
      team,
      country,
      page = 1,
      limit = 20,
      sort = 'name',
      active
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (role) {
      filter.role = role;
    }
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }
    
    if (team) {
      filter['teams.teamName'] = { $regex: team, $options: 'i' };
    }
    
    if (country) {
      filter.internationalTeam = { $regex: country, $options: 'i' };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const players = await Player.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Player.countDocuments(filter);

    res.json({
      success: true,
      data: {
        players,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get players error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/active
// @desc    Get active players
// @access  Public
router.get('/active', async (req, res) => {
  try {
    const players = await Player.findActivePlayers();
    
    res.json({
      success: true,
      data: {
        players
      }
    });
  } catch (error) {
    console.error('Get active players error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/top-batsmen
// @desc    Get top batsmen by format
// @access  Public
router.get('/top-batsmen', [
  query('format').optional().isIn(['test', 'odi', 't20']),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { format = 'test', limit = 10 } = req.query;
    const players = await Player.findTopBatsmen(format, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        players
      }
    });
  } catch (error) {
    console.error('Get top batsmen error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/top-bowlers
// @desc    Get top bowlers by format
// @access  Public
router.get('/top-bowlers', [
  query('format').optional().isIn(['test', 'odi', 't20']),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { format = 'test', limit = 10 } = req.query;
    const players = await Player.findTopBowlers(format, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        players
      }
    });
  } catch (error) {
    console.error('Get top bowlers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/team/:teamName
// @desc    Get players by team
// @access  Public
router.get('/team/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const players = await Player.findByTeam(teamName);
    
    res.json({
      success: true,
      data: {
        players
      }
    });
  } catch (error) {
    console.error('Get players by team error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/role/:role
// @desc    Get players by role
// @access  Public
router.get('/role/:role', [
  query('role').isIn(['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 'Wicket-keeper batsman'])
], async (req, res) => {
  try {
    const { role } = req.params;
    const players = await Player.findByRole(role);
    
    res.json({
      success: true,
      data: {
        players
      }
    });
  } catch (error) {
    console.error('Get players by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/players/:playerId
// @desc    Get player by ID
// @access  Public
router.get('/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    
    const player = await Player.findOne({ playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    res.json({
      success: true,
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Get player error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/players
// @desc    Create a new player
// @access  Private (Admin/Moderator)
router.post('/', [
  authenticateToken,
  requireModerator,
  body('playerId').notEmpty().withMessage('Player ID is required'),
  body('name').notEmpty().withMessage('Player name is required'),
  body('role').isIn(['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 'Wicket-keeper batsman']).withMessage('Invalid role'),
  body('battingStyle').optional().isString(),
  body('bowlingStyle').optional().isString(),
  body('internationalTeam').optional().isString(),
  body('dateOfBirth').optional().isISO8601(),
  body('birthPlace').optional().isString(),
  body('height').optional().isString(),
  body('bio').optional().isString()
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

    const playerData = req.body;

    // Check if player already exists
    const existingPlayer = await Player.findOne({ playerId: playerData.playerId });
    if (existingPlayer) {
      return res.status(400).json({
        success: false,
        message: 'Player with this ID already exists'
      });
    }

    const player = new Player(playerData);
    await player.save();

    res.status(201).json({
      success: true,
      message: 'Player created successfully',
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Create player error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/players/:playerId
// @desc    Update player
// @access  Private (Admin/Moderator)
router.put('/:playerId', [
  authenticateToken,
  requireModerator,
  body('name').optional().isString(),
  body('role').optional().isIn(['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper', 'Wicket-keeper batsman']),
  body('battingStyle').optional().isString(),
  body('bowlingStyle').optional().isString(),
  body('internationalTeam').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('isRetired').optional().isBoolean(),
  body('retirementDate').optional().isISO8601()
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

    const { playerId } = req.params;
    const updateData = req.body;

    const player = await Player.findOne({ playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    // Update fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        player[key] = updateData[key];
      }
    });

    player.lastUpdated = new Date();
    await player.save();

    res.json({
      success: true,
      message: 'Player updated successfully',
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Update player error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/players/:playerId
// @desc    Delete player
// @access  Private (Admin only)
router.delete('/:playerId', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const { playerId } = req.params;
    
    const player = await Player.findOne({ playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    await Player.deleteOne({ playerId });

    res.json({
      success: true,
      message: 'Player deleted successfully'
    });
  } catch (error) {
    console.error('Delete player error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/players/:playerId/statistics
// @desc    Update player statistics
// @access  Private (Admin/Moderator)
router.put('/:playerId/statistics', [
  authenticateToken,
  requireModerator,
  body('format').isIn(['test', 'odi', 't20']).withMessage('Valid format is required'),
  body('type').isIn(['batting', 'bowling']).withMessage('Valid type is required'),
  body('statistics').isObject().withMessage('Statistics object is required')
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

    const { playerId } = req.params;
    const { format, type, statistics } = req.body;

    const player = await Player.findOne({ playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    await player.updateStatistics(format, type, statistics);

    res.json({
      success: true,
      message: 'Statistics updated successfully',
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Update statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/players/:playerId/recent-form
// @desc    Add recent form entry
// @access  Private (Admin/Moderator)
router.post('/:playerId/recent-form', [
  authenticateToken,
  requireModerator,
  body('matchType').isIn(['test', 'odi', 't20']).withMessage('Valid match type is required'),
  body('matchId').notEmpty().withMessage('Match ID is required'),
  body('matchName').notEmpty().withMessage('Match name is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('runs').optional().isInt({ min: 0 }),
  body('wickets').optional().isInt({ min: 0 }),
  body('performance').optional().isString()
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

    const { playerId } = req.params;
    const formData = req.body;

    const player = await Player.findOne({ playerId });
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    await player.addRecentForm(formData);

    res.json({
      success: true,
      message: 'Recent form added successfully',
      data: {
        player
      }
    });
  } catch (error) {
    console.error('Add recent form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
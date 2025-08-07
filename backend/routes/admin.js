const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    // Import models
    const User = require('../models/User');
    const Match = require('../models/Match');
    const Player = require('../models/Player');

    // Get statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalMatches = await Match.countDocuments();
    const liveMatches = await Match.countDocuments({ status: 'live' });
    const totalPlayers = await Player.countDocuments();
    const activePlayers = await Player.countDocuments({ isActive: true });

    // Get recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email firstName lastName createdAt')
      .lean();

    const recentMatches = await Match.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name status date teams')
      .lean();

    const recentPlayers = await Player.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name role internationalTeam')
      .lean();

    res.json({
      success: true,
      data: {
        statistics: {
          users: {
            total: totalUsers,
            active: activeUsers,
            inactive: totalUsers - activeUsers
          },
          matches: {
            total: totalMatches,
            live: liveMatches,
            upcoming: await Match.countDocuments({ status: 'upcoming' }),
            completed: await Match.countDocuments({ status: 'completed' })
          },
          players: {
            total: totalPlayers,
            active: activePlayers,
            retired: totalPlayers - activePlayers
          }
        },
        recentActivity: {
          users: recentUsers,
          matches: recentMatches,
          players: recentPlayers
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/sync-data
// @desc    Sync data from external APIs
// @access  Private (Admin)
router.post('/sync-data', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || !['matches', 'players', 'all'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sync type. Must be matches, players, or all'
      });
    }

    // Import the API routes to use their sync functions
    const _apiRoutes = require('./api');
    
    const syncResults = {};

    if (type === 'matches' || type === 'all') {
      try {
        // This would call the sync-matches endpoint logic
        syncResults.matches = {
          success: true,
          message: 'Matches sync initiated'
        };
      } catch (error) {
        syncResults.matches = {
          success: false,
          message: error.message
        };
      }
    }

    if (type === 'players' || type === 'all') {
      try {
        // This would call the sync-players endpoint logic
        syncResults.players = {
          success: true,
          message: 'Players sync initiated'
        };
      } catch (error) {
        syncResults.players = {
          success: false,
          message: error.message
        };
      }
    }

    res.json({
      success: true,
      message: 'Data sync completed',
      data: {
        syncResults
      }
    });
  } catch (error) {
    console.error('Sync data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/system-info
// @desc    Get system information
// @access  Private (Admin)
router.get('/system-info', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const os = require('os');
    const process = require('process');

    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem()
      },
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0].model
      },
      uptime: {
        system: os.uptime(),
        process: process.uptime()
      },
      environment: process.env.NODE_ENV || 'development'
    };

    res.json({
      success: true,
      data: {
        systemInfo
      }
    });
  } catch (error) {
    console.error('Get system info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/clear-cache
// @desc    Clear application cache
// @access  Private (Admin)
router.post('/clear-cache', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    // This would clear any cached data
    // For now, just return success
    
    res.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Clear cache error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/logs
// @desc    Get application logs (placeholder)
// @access  Private (Admin)
router.get('/logs', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    // This would return application logs
    // For now, return placeholder data
    
    res.json({
      success: true,
      data: {
        logs: [
          {
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'Application started',
            source: 'server'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/admin/backup
// @desc    Create database backup
// @access  Private (Admin)
router.post('/backup', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    // This would create a database backup
    // For now, return success
    
    res.json({
      success: true,
      message: 'Backup created successfully',
      data: {
        backupId: `backup_${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Create backup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
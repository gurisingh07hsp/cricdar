const express = require('express');
const { body, query, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin, requireModerator } = require('../middleware/auth');
const router = express.Router();

// Placeholder for Series model - you can create this later
const _Series = require('../models/Series');

// @route   GET /api/series
// @desc    Get all series with filtering and pagination
// @access  Public
router.get('/', [
  query('status').optional().isIn(['upcoming', 'live', 'completed', 'cancelled']),
  query('type').optional().isIn(['test', 'odi', 't20', 't20i']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort').optional().isIn(['name', '-name', 'date', '-date']),
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
      type,
      page = 1,
      limit = 20,
      _sort = '-date',
      featured
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }
    if (featured !== undefined) {
      filter.isFeatured = featured === 'true';
    }

    // Calculate pagination
    const _skip = (page - 1) * limit;

    // Execute query (placeholder - implement when Series model is created)
    const series = []; // await Series.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).lean();
    const total = 0; // await Series.countDocuments(filter);

    res.json({
      success: true,
      data: {
        series,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get series error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/series/:seriesId
// @desc    Get series by ID
// @access  Public
router.get('/:seriesId', async (req, res) => {
  try {
    const _seriesId = req.params;
    
    // Placeholder - implement when Series model is created
    // const series = await Series.findOne({ seriesId });
    
    const series = null;
    
    if (!series) {
      return res.status(404).json({
        success: false,
        message: 'Series not found'
      });
    }

    res.json({
      success: true,
      data: {
        series
      }
    });
  } catch (error) {
    console.error('Get series error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/series
// @desc    Create a new series
// @access  Private (Admin/Moderator)
router.post('/', [
  authenticateToken,
  requireModerator,
  body('name').notEmpty().withMessage('Series name is required'),
  body('type').isIn(['test', 'odi', 't20', 't20i']).withMessage('Invalid series type'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('teams').isArray({ min: 2 }).withMessage('At least 2 teams are required')
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

    const seriesData = req.body;

    // Placeholder - implement when Series model is created
    // const series = new Series(seriesData);
    // await series.save();

    res.status(201).json({
      success: true,
      message: 'Series created successfully',
      data: {
        series: seriesData
      }
    });
  } catch (error) {
    console.error('Create series error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/series/:seriesId
// @desc    Update series
// @access  Private (Admin/Moderator)
router.put('/:seriesId', [
  authenticateToken,
  requireModerator,
  body('name').optional().isString(),
  body('type').optional().isIn(['test', 'odi', 't20', 't20i']),
  body('status').optional().isIn(['upcoming', 'live', 'completed', 'cancelled']),
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

    const _seriesId = req.params;
    const updateData = req.body;

    // Placeholder - implement when Series model is created
    // const series = await Series.findOne({ seriesId });
    
    // if (!series) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Series not found'
    //   });
    // }

    // Object.keys(updateData).forEach(key => {
    //   if (updateData[key] !== undefined) {
    //     series[key] = updateData[key];
    //   }
    // });

    // await series.save();

    res.json({
      success: true,
      message: 'Series updated successfully',
      data: {
        series: updateData
      }
    });
  } catch (error) {
    console.error('Update series error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/series/:seriesId
// @desc    Delete series
// @access  Private (Admin only)
router.delete('/:seriesId', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const _seriesId = req.params;
    
    // Placeholder - implement when Series model is created
    // const series = await Series.findOne({ seriesId });
    
    // if (!series) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Series not found'
    //   });
    // }

    // await Series.deleteOne({ seriesId });

    res.json({
      success: true,
      message: 'Series deleted successfully'
    });
  } catch (error) {
    console.error('Delete series error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 
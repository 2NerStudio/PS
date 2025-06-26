const User = require('../models/User');
const GameResult = require('../models/GameResult');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get current user profile
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  // Get user's game history
  const gameHistory = await GameResult.find({ user: req.user.id })
    .sort('-playedAt')
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      user,
      gameHistory
    }
  });
});

// @desc    Update user scores
// @route   PUT /api/v1/users/scores
// @access  Private
exports.updateScores = asyncHandler(async (req, res, next) => {
  const { difficulty, score } = req.body;
  
  // Find user
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  
  // Only update if new score is higher
  if (score > user.scores[difficulty]) {
    user.scores[difficulty] = score;
    user.lastPlayed = Date.now();
    await user.save();
    
    // Record game result
    await GameResult.create({
      user: req.user.id,
      difficulty,
      score,
      totalQuestions: 5 // Assuming 5 questions per game
    });
  }
  
  res.status(200).json({
    success: true,
    data: user.scores
  });
});

// @desc    Get leaderboard
// @route   GET /api/v1/users/leaderboard
// @access  Public
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
  // Aggregate users with their weighted scores
  const leaderboard = await User.aggregate([
    {
      $project: {
        name: 1,
        scores: 1,
        lastPlayed: 1,
        createdAt: 1,
        totalScore: {
          $add: [
            "$scores.easy",
            { $multiply: ["$scores.medium", 2] },
            { $multiply: ["$scores.hard", 3] }
          ]
        }
      }
    },
    { $sort: { totalScore: -1, createdAt: 1 } },
    { $limit: 100 }
  ]);

  res.status(200).json({
    success: true,
    count: leaderboard.length,
    data: leaderboard
  });
});
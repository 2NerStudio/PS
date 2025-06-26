const express = require('express');
const {
  getMe,
  updateScores,
  getLeaderboard
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/scores', protect, updateScores);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
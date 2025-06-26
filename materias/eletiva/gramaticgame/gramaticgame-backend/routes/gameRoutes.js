const express = require('express');
const {
  getQuestions,
  addQuestion
} = require('../controllers/gameController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getQuestions)
  .post(protect, addQuestion);

module.exports = router;
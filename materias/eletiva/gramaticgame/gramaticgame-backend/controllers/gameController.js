const Question = require('../models/Question');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get questions by difficulty
// @route   GET /api/v1/questions
// @access  Private
exports.getQuestions = asyncHandler(async (req, res, next) => {
  const difficulty = req.query.difficulty || 'easy';
  const count = parseInt(req.query.count) || 5; // 5 perguntas por padrão

  // Validar dificuldade
  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return next(new ErrorResponse('Dificuldade inválida', 400));
  }

  // Obter perguntas aleatórias
  const questions = await Question.aggregate([
    { $match: { difficulty } },
    { $sample: { size: count } },
    { $project: { correctAnswer: 0 } } // Não enviar a resposta correta
  ]);

  res.status(200).json({
    success: true,
    count: questions.length,
    data: questions
  });
});

// @desc    Add new question
// @route   POST /api/v1/questions
// @access  Private/Admin
exports.addQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.create(req.body);

  res.status(201).json({
    success: true,
    data: question
  });
});
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais que 50 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'Por favor, adicione um e-mail'],
    unique: true,
    validate: [validator.isEmail, 'Por favor, insira um e-mail válido'],
  },
  password: {
    type: String,
    required: [true, 'Por favor, adicione uma senha'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
    select: false,
  },
  scores: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
  },
  lastPlayed: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Gerar token JWT
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Comparar senhas
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
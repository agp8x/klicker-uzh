const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const QuestionOptions = require('./QuestionOptions')

module.exports = new mongoose.Schema({
  description: { type: String, required: true },
  options: { type: QuestionOptions, required: true },
  solution: { type: Object, required: true },

  instances: [{ type: ObjectId, ref: 'QuestionInstance' }],

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

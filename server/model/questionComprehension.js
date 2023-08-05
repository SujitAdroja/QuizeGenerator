const mongoose = require("mongoose");

const QuestionComprehensionSchema = new mongoose.Schema({
  question: String,
  answers: [String],
});
module.exports = mongoose.model(
  "QuestionComprehension",
  QuestionComprehensionSchema
);

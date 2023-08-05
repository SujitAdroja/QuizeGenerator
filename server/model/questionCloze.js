const mongoose = require("mongoose");

const QuestionCloze = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "must provide name"],
  },
  answers: [String],
});

module.exports = mongoose.model("QuestionCloze", QuestionCloze);

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "must provide name"],
    maxlength: [20, "name can not be more than 20 char"],
    trim: true,
  },
  categories: [
    {
      id: String,
      name: String,
    },
  ],
  answers: [
    {
      id: String,
      category: String,
      name: String,
    },
  ],
});

module.exports = mongoose.model("Questions", QuestionSchema);

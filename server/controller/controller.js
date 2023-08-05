const Questions = require("../model/questions");
const QuestionCloze = require("../model/questionCloze");
const QuestionComprehension = require("../model/questionComprehension");
//questions cat
exports.getAllQuestion = async (req, res) => {
  const questions = await Questions.find({});
  res.status(201).json({ questions });
};

exports.postQuestion = async (req, res) => {
  const question = await Questions.create(req.body);
  console.log(req.body);
  res.status(201).json({ question });
};

//questions cloze
exports.getAllQuestionsCloze = async (req, res) => {
  const questions = await QuestionCloze.find({});
  res.status(201).json({ questions });
};
exports.postClozeQuestion = async (req, res) => {
  const question = await QuestionCloze.create(req.body);
  console.log(req.body);
  res.status(201).json({ question });
};

//comprehensions controller functions
exports.getComprehensionQuestions = async (req, res) => {
  const questions = await QuestionComprehension.find({});
  res.status(201).json({ questions });
};
exports.postComprehensionQuestion = async (req, res) => {
  const question = await QuestionComprehension.create(req.body);
  console.log(question);
  res.status(201).json({ question });
};

const express = require("express");
const router = express.Router();
const {
  getAllQuestion,
  postQuestion,
  getAllQuestionsCloze,
  postClozeQuestion,
  getComprehensionQuestions,
  postComprehensionQuestion,
} = require("../controller/controller");

router.route("/questions").get(getAllQuestion);
router.route("/question").post(postQuestion);

router.route("/questionClozes").get(getAllQuestionsCloze);
router.route("/questionCloze").post(postClozeQuestion);

router.route("/questionComprehensions").get(getComprehensionQuestions);
router.route("/questionComprehension").post(postComprehensionQuestion);
// router
//   .route("/question/:id")
//   .get(getOneQuestion)
//   .post(postOneQuestion)
//   .delete(deleteQuestion);
module.exports = router;

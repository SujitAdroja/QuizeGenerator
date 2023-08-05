import React, { useState, useEffect } from "react";
import axios from "axios";

function Comprehension() {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState("");
  const [answers, setAnswers] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");

  function changeAnswerValue(e, ansId) {
    setAnswers(
      answers.map((ans, index) => (index === ansId ? e.target.value : ""))
    );
  }

  function deleteAnswer(id) {
    const newAnswers = answers.filter((ans, ansId) => ansId !== id);
    setAnswers(newAnswers);
  }
  function addAnswers() {
    if (!inputAnswer) return;
    setAnswers([...answers, inputAnswer]);
    setInputAnswer("");
  }

  useEffect(() => {
    localStorage.setItem("question", JSON.stringify(questions));
  }, [questions]);

  function submitQuestion() {
    if (answers.length === 0) return;
    if (ques === "") return;
    console.log(ques);
    setQuestions([
      ...questions,
      {
        question: ques,
        answers,
      },
    ]);
    axios.post(
      "https://generator-zcgg.onrender.com/api/v1/questionComprehension",
      {
        question: ques,
        answers,
      }
    );
    setAnswers([]);
    setInputAnswer("");
    setQues("");
  }

  function deleteQuestion(id) {
    const newQuestion = questions.filter((qu, index) => index !== id);
    setQuestions(newQuestion);
  }
  return (
    <div className="my-24">
      <div>
        <p className="text-4xl">Comprehension Questions</p>
      </div>
      {questions &&
        questions.map((question, index) => {
          return (
            <div
              key={index}
              className="relative rounded-lg w-3/4 mt-24  p-24  border"
            >
              <div className="main-question mb-20">
                <h3 className="text-4xl mb-12">Question {index + 1}</h3>

                <div className="mb-12">
                  <p className="text-2xl mb-4 font-medium">Question </p>
                  <p
                    className="rounded-lg border border-solid text-2xl p-3 mr-4
                w-3/4 "
                    type="text"
                  >
                    {question.question}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-12">Answers</h3>
                  <div>
                    {question.answers &&
                      question.answers.map((ans, ansId) => {
                        return (
                          <div key={ansId} className="flex gap-4 mb-6">
                            <input
                              type="radio"
                              id={`${ans}`}
                              name="option_answer"
                              value={`${ans}`}
                              className="mr-4"
                            />
                            <label
                              htmlFor={`${ans}`}
                              className="rounded-lg border border-solid text-2xl p-3 mr-4"
                            >
                              {ans}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <button
                className="absolute top-0 right-0 mr-10 mt-10"
                onClick={() => {
                  deleteQuestion(index);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      <div className="rounded-lg w-3/4 mt-24   p-24  border">
        <div className="main-question mb-20">
          <h3 className="text-4xl mb-12">Question {questions.length + 1}</h3>

          <div className="mb-12">
            <p className="text-2xl mb-4 font-medium">Question *</p>
            <input
              className="rounded-lg border border-solid text-2xl p-3 mr-4 w-3/4 "
              type="text"
              placeholder="Description (optional)"
              value={ques}
              onChange={(e) => {
                setQues(e.target.value);
              }}
            />
          </div>
          <div>
            {answers &&
              answers.map((ans, ansId) => {
                return (
                  <div key={ansId} className="flex   mb-6">
                    <input
                      className="rounded-lg border border-solid text-2xl p-3 mr-4"
                      type="text"
                      value={ans}
                      placeholder="Description (optional)"
                      onChange={(e) => {
                        changeAnswerValue(e, ansId);
                      }}
                    />
                    <button
                      className="btn-delete"
                      onClick={() => deleteAnswer(ansId)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="mb-12">
            <input
              className="rounded-lg border border-solid text-2xl p-3 mr-4"
              type="text"
              value={inputAnswer && inputAnswer}
              onChange={(e) => {
                setInputAnswer(e.target.value);
              }}
              placeholder={`Option ${answers.length + 1} `}
            />
            <button
              className="rounded-lg border border-solid border-1 p-3 text-2xl"
              onClick={addAnswers}
            >
              ADD
            </button>
          </div>
          <button
            onClick={submitQuestion}
            className="rounded-lg border border-solid border-1 p-3 text-3xl bg-cyan-600	text-white hover:bg-cyan-700 active:bg-cyan-600"
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comprehension;

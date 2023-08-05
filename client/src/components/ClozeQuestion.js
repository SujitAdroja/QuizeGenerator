import React, { useState, useEffect } from "react";
import axios from "axios";

function ClozeQuestion() {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState("");
  const [answers, setAnswers] = useState([]);
  const [preview, setPreview] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");

  function onChangeQuestion(e) {
    setQues(e.target.value);
    let str = e.target.value;
    if (answers) {
      answers.forEach((element) => {
        str.replace(element, "______");
      });
      setPreview(str);
    }
  }

  function getSelectedText() {
    var selectedText = "";

    if (window.getSelection) {
      selectedText = window.getSelection();
    } else if (document.getSelection) {
      selectedText = document.getSelection();
    } else if (document.selection) {
      selectedText = document.selection.createRange().text;
    } else return;
    if (selectedText.toString() === "") return;
    let mergedArr = [selectedText.toString(), ...answers];
    setAnswers(mergedArr);
    setPreview(preview.replace(mergedArr[0], "______ "));
  }

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
    console.log(inputAnswer);
    console.log("answers", [...answers, inputAnswer]);
    if (!inputAnswer) return;
    setAnswers([...answers, inputAnswer]);
    setInputAnswer("");
  }

  useEffect(() => {
    localStorage.setItem("question", JSON.stringify(questions));
  }, [questions]);

  function submitQuestion() {
    if (preview === "" && answers.length === 0) return;

    setQuestions([
      ...questions,
      {
        question: preview,
        answers,
      },
    ]);
    axios.post("http://localhost:8000/api/v1/questionCloze", {
      question: preview,
      answers,
    });
    setAnswers([]);
    setPreview("");
    setInputAnswer("");
    setQues("");
  }

  function showUnderline() {}
  return (
    <div className="my-24">
      <div>
        <p className="text-4xl">Cloze Questions</p>
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
                  {question.answers &&
                    question.answers.map((ans, ansId) => {
                      return (
                        <div key={ansId} className="flex   mb-6">
                          <p className="rounded-lg border border-solid text-2xl p-3 mr-4">
                            {ans}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <button className="absolute top-0 right-0 mr-10 mt-10">
                delete
              </button>
            </div>
          );
        })}
      <div className="rounded-lg w-3/4 mt-24   p-24  border">
        <div className="main-question mb-20">
          <h3 className="text-4xl mb-12">Question {questions.length + 1}</h3>
          <div className="mb-12 w-3/4">
            <p className="text-2xl mb-4 font-medium ">
              Preview * ( Lenght upto 30 character )
            </p>
            <p className="overflow-hidden rounded-lg border border-solid text-2xl p-3 mr-4 ">
              {preview ? preview : "Preview of question"}
            </p>
          </div>
          <div className="mb-12">
            <p className="text-2xl mb-4 font-medium">Question *</p>
            <input
              className="rounded-lg border border-solid text-2xl p-3 mr-4 w-3/4 "
              type="text"
              placeholder="Description (optional)"
              value={ques}
              onChange={onChangeQuestion}
              onClick={showUnderline}
            />
            <button
              className="text-2xl underline font-medium"
              onClick={getSelectedText}
            >
              Under Line
            </button>
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

export default ClozeQuestion;

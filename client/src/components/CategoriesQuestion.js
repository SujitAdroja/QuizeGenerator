import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import "../index.css";
import RenderComponent from "./RenderComponent";
import axios from "axios";

function CategoriesQuestion() {
  const [questions, setQuestions] = useState([
    // {
    //   question: "",
    //   answers: [],
    //   categories: [],
    // },
  ]);
  const [ques, setQuestion] = useState("");
  const [categories, setCategories] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");

  function onChangeValue(e) {
    // if (e.target.value == "") return;
    setQuestion(`${e.target.value}`);
  }

  function addCatagory() {
    if (inputText === "") return;
    let addedCategory = [...categories, inputText];
    setCategories(addedCategory);
    setInputText("");
  }
  function insertCategories(e, id) {
    const updatedCategories = categories.map((ele, i) =>
      ele.id === id ? { ...ele, name: e.target.value } : ele
    );
    setCategories(updatedCategories);
    // console.log(updatedCategories); //printed already before setcatagories due to async setcatagories.
  }

  function deleteCatagory(id) {
    let filterCategories = categories.filter((item) => item.id !== id);
    setCategories(filterCategories);
  }

  function addAnswers() {
    if (inputAnswer.name === "") return;
    let newAnswers = [...answers, inputAnswer];
    setAnswers(newAnswers);

    setInputAnswer("");
  }

  function changeAnswer(e, id) {
    const updatedAnswers = answers.map((ans) =>
      ans.id === id ? { ...ans, name: e.target.value } : ans
    );

    setAnswers(updatedAnswers);
  }
  function changeOptions(e, id) {
    const updatedOptions = answers.map((ans) =>
      ans.id === id ? { ...ans, category: e.target.value } : ans
    );
    setAnswers(updatedOptions);
  }
  function deleteAnwer(id) {
    const deletedAnswers = answers.filter((ans) => ans.id !== id);
    setAnswers(deletedAnswers);
  }
  useEffect(() => {
    localStorage.setItem("question", JSON.stringify(questions));
  }, [questions]);

  function submitQuestion() {
    if (ques === "" && categories.length === 0 && answers.length === 0) return;

    // if (!categories && !answers) throw new Error("please select field");
    setQuestions([
      ...questions,
      {
        question: ques,
        categories,
        answers,
      },
    ]);
    axios
      .post("https://generator-zcgg.onrender.com/api/v1/question", {
        question: ques,
        categories,
        answers,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setAnswers([]);
    setCategories([]);
    setInputAnswer("");
    setInputText("");
    setQuestion("");
  }
  return (
    <div className="mt-24">
      <div>
        <p className="text-4xl">Categorical Questions</p>
      </div>
      {questions &&
        questions.map((question, index) => (
          <div className="  mt-24 rounded-lg w-3/4   p-24  border">
            <div>
              <h3 className="text-4xl mb-12">Question {index + 1}</h3>
              <div className="main-question mb-12">
                <p className="text-2xl mb-4 font-medium">Question </p>
                <p
                  className="rounded-lg border border-solid text-2xl p-3  
                  "
                >
                  {question.question}
                </p>
              </div>
              <div className="category-names mb-12">
                <h3 className="text-2xl font-medium mb-7">Categories</h3>
                {question.categories &&
                  question.categories.map((item, index) => (
                    <div key={item.id}>
                      <p className="rounded-lg border border-solid text-2xl p-3 mr-4 mb-2  ">
                        {" "}
                        {item.name}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="catagories-answers">
                <div className="flex gap-80">
                  <h3 className="text-2xl font-medium mb-7">Items</h3>
                  <h3 className="text-2xl font-medium mb-7">Belongs To</h3>
                </div>
                {question.answers &&
                  question.answers.map((ans) => {
                    return (
                      <div className="flex gap-2 mb-4" key={ans.id}>
                        <div className="flex gap-4">
                          <p
                            className="rounded-lg border border-solid text-2xl
                            p-3 mr-4 mb-2"
                            type="text"
                          >
                            {ans.name}
                          </p>

                          <select
                            value={ans.category}
                            className="w-80 rounded-lg border border-solid text-2xl p-3 mr-4 mb-2"
                          >
                            <option>{ans.category}</option>
                            {categories.map((item, index) => (
                              <option key={index} value={`${item.name}`}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* <button className="absolute top-0 right-0 mr-10 mt-10">
              delete
            </button> */}
          </div>
        ))}
      <div className="rounded-lg w-3/4 mt-24  p-24  border">
        <div>
          <h3 className="text-4xl mb-12">Question {questions.length + 1}</h3>
          <div className="main-question mb-12">
            <p className="text-2xl mb-4 font-medium">Question </p>
            <input
              className="rounded-lg border border-solid text-2xl p-3 mr-4 w-3/4"
              type="text"
              placeholder="Description (optional)"
              value={ques}
              onChange={onChangeValue}
            />
          </div>
          <div className="category-names mb-12">
            <h3 className="text-2xl font-medium mb-7">Categories</h3>
            {categories &&
              categories.map((item, index) => (
                <div key={item.id}>
                  <input
                    className="rounded-lg border border-solid text-2xl p-3 mr-4 mb-2  "
                    type="text"
                    value={item.name}
                    onChange={(e) => insertCategories(e, item.id)}
                  />
                  <button
                    className="btn-delete"
                    onClick={() => deleteCatagory(item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            <input
              id={nanoid()}
              className="rounded-lg border border-solid text-2xl p-3 mr-4"
              type="text"
              placeholder={`Category ${
                categories.length === 0 ? 1 : categories.length + 1
              }`}
              required
              value={inputText && inputText.name}
              onChange={(e) =>
                setInputText({ id: nanoid(), name: e.target.value })
              }
            />
            <button
              className="rounded-lg border border-solid border-1 p-3 text-2xl "
              onClick={addCatagory}
            >
              ADD
            </button>
          </div>
          <div className="catagories-answers">
            <div className="flex gap-80">
              <h3 className="text-2xl font-medium mb-7">Items</h3>
              <h3 className="text-2xl font-medium mb-7">Belongs To</h3>
            </div>
            {answers &&
              answers.map((ans) => {
                return (
                  <div className="flex gap-2 mb-4" key={ans.id}>
                    <div className="flex gap-4">
                      <input
                        className="rounded-lg border border-solid text-2xl p-3 mr-4 mb-2"
                        type="text"
                        value={ans && ans.name}
                        onChange={(e) => changeAnswer(e, ans.id)}
                      />

                      <select
                        value={ans && ans.category}
                        onChange={(e) => changeOptions(e, ans.id)}
                        className="w-80 rounded-lg border border-solid text-2xl p-3 mr-4 mb-2"
                      >
                        <option>{ans.category}</option>
                        {categories.map((item, index) => (
                          <option key={index} value={`${item.name}`}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => deleteAnwer(ans.id)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            <div className="flex  mb-12 items-center">
              <div className="flex gap-4">
                <input
                  id={nanoid()}
                  className="rounded-lg border border-solid text-2xl p-3 mr-4  "
                  type="text"
                  placeholder={`Item ${
                    answers.length === 0 ? 1 : answers.length + 1
                  }`}
                  required
                  value={inputAnswer && inputAnswer.name}
                  onChange={(e) =>
                    setInputAnswer({
                      ...inputAnswer,
                      id: nanoid(),
                      name: e.target.value,
                    })
                  }
                />
                <select
                  value={inputAnswer ? inputAnswer.category : ""}
                  onChange={(e) =>
                    setInputAnswer({
                      ...inputAnswer,
                      category: e.target.value,
                    })
                  }
                  className="w-80 rounded-lg border border-solid text-2xl p-3 mr-4 "
                >
                  <option value=""></option>
                  {categories.map((item, index) => (
                    <option key={index} value={`${item.name}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="rounded-lg border border-solid border-1 p-3 text-2xl "
                onClick={addAnswers}
              >
                ADD
              </button>
            </div>
          </div>
          <button
            onClick={submitQuestion}
            className="rounded-lg border border-solid border-1 p-3 text-3xl bg-cyan-600	text-white hover:bg-cyan-700 active:bg-cyan-600	"
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesQuestion;

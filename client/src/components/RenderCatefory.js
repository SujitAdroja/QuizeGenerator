import React from "react";
import { useEffect, useState } from "react";

function RenderCatefory({ question }) {
  const [state, setState] = useState({
    ...question,
    categories: question.categories.map((ans) => ans.name),
  });

  const [tasks, setTasks] = useState({
    answers: state.answers.map((ans) => {
      return { name: ans.name, category: ans.category };
    }),
  });

  useEffect(() => {
    let answers = {
      answers: state.answers.map((ans) => {
        return { name: ans.name, category: ans.category };
      }),
    };
    state.categories.forEach((cat) => {
      answers[cat] = [];
    });

    setTasks(answers);
  }, [state]);
  function onDragOver(ev) {
    ev.preventDefault();
  }

  function onDragStart(e, name, cat) {
    e.dataTransfer.setData("name", name);
    e.dataTransfer.setData("cat", cat);
  }
  function onDrop(ev, ansCat) {
    let nameAnswer = ev.dataTransfer.getData("name");
    let catagoryAnswer = ev.dataTransfer.getData("cat");
    console.log(
      "itemname itemcat catagory",
      nameAnswer,
      catagoryAnswer,
      ansCat
    );
    let answers;
    let girl, boy;
    if (ansCat === "Answers") {
      let answers = {
        answers: [
          ...tasks["answers"],
          { name: nameAnswer, category: catagoryAnswer },
        ],
      };
      state.categories.forEach((cat) => {
        answers[cat] = tasks[cat].filter((item) => item.name !== nameAnswer);
      });
      setTasks(answers);
    } else {
      //working
      let newAnswers = {
        answers: tasks["answers"].filter((item) => item.name !== nameAnswer),
      };

      state.categories.forEach((cat) => {
        if (cat === ansCat) {
          console.log(cat);
          if (tasks[cat].find((index) => index.name === nameAnswer)) {
            newAnswers[cat] = tasks[cat];
          } else {
            newAnswers[cat] = [
              ...tasks[cat],
              { name: nameAnswer, category: catagoryAnswer },
            ];
          }
        } else {
          newAnswers[cat] = tasks[cat].filter(
            (item) => item.name !== nameAnswer
          );
        }
      });

      setTasks(newAnswers);
    }
  }

  return (
    <div className="render-container w-3/4 mt-20 border p-24 pt-3 rounded-lg">
      <div className="py-9">
        <h3 className="text-4xl mb-7">Question</h3>
        <p className="mb-10 text-3xl">{state.question}</p>
        <div
          className="answers flex items-center gap-6 w-full h-20 justify-center mb-10 px-2"
          onDragOver={(e) => {
            onDragOver(e);
          }}
          onDrop={(e) => {
            onDrop(e, "Answers");
          }}
        >
          {tasks.answers.map((ans) => (
            <div
              key={ans.name}
              draggable
              onDragStart={(e) => {
                onDragStart(e, ans.name, ans.category);
              }}
              className="draggable text-center text-3xl p-3 border border-solid"
            >
              {ans.name}
            </div>
          ))}
        </div>

        <div className="flex gap-5 justify-center">
          {state.categories.map((cat, index) => {
            return (
              <div key={index}>
                <h2 className="w-80 text-center text-3xl p-3 border border-solid mb-10">
                  {cat}
                </h2>

                <div
                  className="w-80 h-80 border border-solid"
                  onDragOver={(e) => {
                    onDragOver(e);
                  }}
                  onDrop={(e) => {
                    onDrop(e, cat);
                  }}
                >
                  {tasks[cat] &&
                    tasks[cat].map((item) => (
                      <div
                        key={item.name}
                        draggable
                        onDragStart={(e) => {
                          onDragStart(e, item.name, item.cat);
                        }}
                        className="draggable text-center text-3xl p-3 border border-solid"
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RenderCatefory;

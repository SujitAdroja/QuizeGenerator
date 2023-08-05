import React, { useState } from "react";

function RenderCloze({ question, no }) {
  const [state, setState] = useState(question);
  return (
    <div className="render-container w-3/4 mt-20 border p-24   rounded-lg">
      <div className=" ">
        <div className="mb-20">
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
        <div className="main-question mb-20">
          <h3 className="text-4xl mb-12">Question {no + 1}</h3>

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
        </div>
      </div>
    </div>
  );
}

export default RenderCloze;

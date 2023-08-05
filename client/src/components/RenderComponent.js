import React, { useEffect, useState } from "react";
import "../index.css";
import RenderCatefory from "./RenderCatefory";
import axios from "axios";
import RenderCloze from "./RenderCloze";

function RenderComponent({}) {
  const [category, setCategory] = useState([]);
  const [cloze, setCloze] = useState([]);
  useEffect(() => {
    axios
      .get("https://generator-zcgg.onrender.com/api/v1/questions")
      .then((data) => setCategory(data.data.questions));
    axios
      .get("https://generator-zcgg.onrender.com/api/v1/questionClozes")
      .then((data) => setCloze(data.data.questions));
  }, []);

  return (
    <div className="flex  flex-col gap-10">
      <div>
        {category &&
          category.map((question, index) => (
            <RenderCatefory key={index} question={question} />
          ))}
      </div>
      <div>
        {cloze &&
          cloze.map((question, index) => (
            <RenderCloze key={index} question={question} />
          ))}
      </div>
    </div>
  );
}

export default RenderComponent;

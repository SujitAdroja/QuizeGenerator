import React, { useEffect, useState } from "react";
import "../index.css";
import RenderCatefory from "./RenderCatefory";
import axios from "axios";
import RenderCloze from "./RenderCloze";

function RenderComponent({}) {
  const [category, setCategory] = useState([]);
  const [cloze, setCloze] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("https://generator-zcgg.onrender.com/api/v1/questions")
      .then((data) => setCategory(data.data.questions));
    axios
      .get("https://generator-zcgg.onrender.com/api/v1/questionClozes")
      .then((data) => setCloze(data.data.questions));
  }, [show]);

  return (
    <div className="flex  flex-col gap-10">
      <div>
        {category &&
          category.map((question, index) => (
            <RenderCatefory key={index} no={index} question={question} />
          ))}
      </div>
      <div>
        {cloze &&
          cloze.map((question, index) => (
            <RenderCloze key={index} no={index} question={question} />
          ))}
      </div>
    </div>
  );
}

export default RenderComponent;

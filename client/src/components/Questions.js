import React from "react";
import CategoriesQuestion from "./CategoriesQuestion";
import ClozeQuestion from "./ClozeQuestion";
import Comprehension from "./Comprehension";

function Questions() {
  return (
    <div className="flex flex-col ">
      <CategoriesQuestion />
      <ClozeQuestion />
      <Comprehension />
    </div>
  );
}

export default Questions;

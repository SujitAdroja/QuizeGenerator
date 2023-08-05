import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/5 h-screen bg-cyan-700  flex py-24   sticky  top-0 left-0 z-0">
      <ul className="text-3xl text-white font-medium ml-6">
        <li className="mb-4 cursor-pointer">
          <Link to={"/"}>Create question</Link>
        </li>
        <li className="cursor-pointer">
          <Link to={"/render"}>Render Question</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

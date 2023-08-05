import logo from "./logo.svg";
import "./App.css";
import Questions from "./components/Questions";
import RenderComponent from "./components/RenderComponent";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <div className="flex gap-32">
          <Sidebar />
          <div className="w-4/5">
            <Routes>
              <Route exact path="/" element={<Questions />} />
              <Route exact path="/render" element={<RenderComponent />} />
              {/* <Questions />
          <RenderComponent /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

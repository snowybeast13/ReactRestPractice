import React from "react";
import "./App.css";
import SearchUsers from "./components/SearchUsers";
import SingleUser from "./components/SingleUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchUsers />} />
          <Route path="/users/:login" element={<SingleUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

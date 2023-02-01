import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ListScreen from "./component/ListScreen";
function App() {
  useEffect(() => {
    fetch("/api").then((res) => console.log(res, "coming"));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListScreen />} />
      </Routes>
    </div>
  );
}

export default App;

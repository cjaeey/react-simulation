import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Simulation from "./components/Simulation";
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Simulation />} />
      </Routes>
    </Router>
  );
};

export default App;

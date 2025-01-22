import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Elimination from "./components/Elimination";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/elimination" element={<Elimination />} />
      </Routes>
    </Router>
  );
}

export default App;

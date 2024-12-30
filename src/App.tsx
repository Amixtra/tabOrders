import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./TablePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </Router>
  );
};

export default App;

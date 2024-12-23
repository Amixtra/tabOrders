import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./TablePage"; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/table/:id" element={<TablePage />} />
      </Routes>
    </Router>
  );
};

export default App;

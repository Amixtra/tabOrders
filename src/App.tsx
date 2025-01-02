import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./TablePage";
import Login from "components/form/Login";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/table" element={<TablePage />} />
    //   </Routes>
    // </Router>
    <Login />
  );
};

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./TablePage";
import Login from "components/form/Login";
import TableSetting from "components/TableSetting/TableSetting";
import ErrorPage from "components/Error/ErrorPage";
import AdminPage from "Admin/Admin";
import ProtectedRoute from "ProtectedRoute";

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tableSetting" element={<TableSetting />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
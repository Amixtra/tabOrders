import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>This is the Admin Page</h1>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  color: "white",
  backgroundColor: "red",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminPage;

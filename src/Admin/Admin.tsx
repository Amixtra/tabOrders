// import Header from "components/@share/Layout/header/Header";
import AdminGridContainer from "./gridContainer/AdminGridContainer";
import Nav from "./navigator/AdminNav";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const getTokenData = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    } else {
      console.warn("No token found in localStorage.");
      return null;
    }
  };

  useEffect(() => {
    const decoded = getTokenData();
    if (decoded && decoded.username) {
      setUserName(decoded.username);
    }
  }, []);

  if (userName) {
    console.log(`Welcome to the console ${userName}!`)
  }

  return (
    <>
      <AdminGridContainer>
        <Nav />
      </AdminGridContainer>
    </>
  );
};
export default AdminPage;

// AdminPage.tsx
import { useEffect, useState } from "react";
import AdminGridContainer from "./gridContainer/AdminGridContainer";
import Nav from "./navigator/AdminNav";
import QRPin from "./qr-pin/QR-Pin";
import Order from "./order/Order";
import WaiterOptions from "./waiterOptions/WaiterOptions";
import MenuOptions from "./menuOptions/MenuOptions";
import useOrderNotifications from "../hooks/userNotification";

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

const AdminPage = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>(
    localStorage.getItem("selectedSection") || "order"
  );

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    localStorage.setItem("selectedSection", section);
  };

  const tokenData = getTokenData();

  useEffect(() => {
    if (tokenData && tokenData.username) {
      setUserName(tokenData.username);
    }
  }, [tokenData]);

  // Call the hook at the top level. The hook can internally decide whether to act based on the userId.
  useOrderNotifications(tokenData?.userId);

  if (userName) {
    console.log(`Welcome to the console ${userName}!`);
  }

  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <AdminGridContainer>
      <Nav setSelectedSection={handleSectionChange} selectedSection={selectedSection} />
      {selectedSection === "order" && <Order />}
      {selectedSection === "qr-pin" && <QRPin />}
      {selectedSection === "waiter-options" && <WaiterOptions />}
      {selectedSection === "menu-options" && <MenuOptions />}
    </AdminGridContainer>
  );
};

export default AdminPage;

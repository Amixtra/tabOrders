import React, { useEffect, useState } from "react";
import AdminGridContainer from "./gridContainer/AdminGridContainer";
import Nav from "./navigator/AdminNav";
import QRPin from "./qr-pin/QR-Pin";
import Order from "./order/Order";
import MenuOptions from "./menuOptions/MenuOptions";
import useOrderNotifications from "../hooks/userNotification";
import BillOut from "./BillOut/BillOut";
import { io } from "socket.io-client";
import { BillOutCustomerPopup } from "components/Cart/Cart";
import { LanguageCode } from "db/constants";
import axios from "axios";
import { WaiterCallPopup } from "components/Cart/Cart";
import StaffPage from "./staffPage/StaffPage";

const socket = io("http://43.200.251.48:8080");

// --- Type Definitions ---
type OrderItem = {
  itemName: string;
  itemPrice: number;
  cartItemQuantity: number;
};

type Order = {
  userID: string;
  orderNumber: number;
  orderType: string;
  tableNumber: number;
  confirmStatus: string;
  createdAt: string;
  totalPrice: number;
  items: OrderItem[];
  paymentType?: string;
  paidAt?: string;
};

type GroupedTable = {
  tableNumber: number;
  allOrders: Order[];
  lastOrderTime: string;
};

// --- Helper Function ---
const groupByTable = (orders: Order[]): GroupedTable[] => {
  const map: Record<number, GroupedTable> = {};
  for (const o of orders) {
    const orderTime = o.paidAt ? o.paidAt : o.createdAt;
    if (!map[o.tableNumber]) {
      map[o.tableNumber] = {
        tableNumber: o.tableNumber,
        allOrders: [o],
        lastOrderTime: orderTime,
      };
    } else {
      map[o.tableNumber].allOrders.push(o);
      const currentLast = new Date(map[o.tableNumber].lastOrderTime).getTime();
      const newTime = new Date(orderTime).getTime();
      if (newTime > currentLast) {
        map[o.tableNumber].lastOrderTime = orderTime;
      }
    }
  }
  return Object.values(map).sort((a, b) => a.tableNumber - b.tableNumber);
};

// --- Token Helper ---
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
  const [showCustomerBillPopup, setShowCustomerBillPopup] = useState(false);
  const [customerBillData, setCustomerBillData] = useState<{
    cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number }[];
    totalPrice: string;
    orderNumber: string;
  } | null>(null);

  // New states for WaiterCallPopup.
  const [showWaiterCallPopup, setShowWaiterCallPopup] = useState(false);
  const [waiterCallData, setWaiterCallData] = useState<{ tableId: string; orders?: any } | null>(null);

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

  useOrderNotifications(tokenData?.userId);

  // Listen for the customerBillOut event and fetch only confirmed orders
  useEffect(() => {
    socket.on("customerBillOut", async (data: { tableId: string; company?: string }) => {
      if (tokenData?.userId) {
        try {
          // Fetch all bills for the current user
          const response = await axios.get("http://43.200.251.48:8080/api/orders/bills-of-table", {
            params: { userID: tokenData.userId },
          });
          const orders: Order[] = response.data;
          // Only use orders with a confirmStatus of "Confirmed"
          const confirmedOrders = orders.filter((order) => order.confirmStatus === "Confirmed");
          const grouped = groupByTable(confirmedOrders);
          const tableNumber = parseInt(data.tableId, 10);
          const foundGroup = grouped.find((g) => g.tableNumber === tableNumber);
          if (foundGroup) {
            const cartItems = foundGroup.allOrders.flatMap((order) => order.items);
            const totalPriceNum = foundGroup.allOrders.reduce((sum, order) => sum + order.totalPrice, 0);
            const totalPrice = totalPriceNum.toFixed(2);
            const orderNumber = `Table-${tableNumber}`;
            setCustomerBillData({ cartItems, totalPrice, orderNumber });
            setShowCustomerBillPopup(true);
          } else {
            console.error("No confirmed orders found for table", tableNumber);
          }
        } catch (err) {
          console.error("Error fetching orders for customer bill out", err);
        }
      }
    });
    return () => {
      socket.off("customerBillOut");
    };
  }, [tokenData]);

  useEffect(() => {
    socket.on("customerCallWaiter", (data: { tableId: string; orders?: { name: string; quantity: number }[]; time?: string }) => {
      console.log("Received waiter call:", data);
      setWaiterCallData(data);
      setShowWaiterCallPopup(true);
    });
    return () => {
      socket.off("customerCallWaiter");
    };
  }, []);

  const handlePopupConfirm = () => {
    setShowCustomerBillPopup(false);
    setCustomerBillData(null);
    setSelectedSection("bill-out");
  };

  const handlePopupCancel = () => {
    setShowCustomerBillPopup(false);
    setCustomerBillData(null);
  };

  const handleWaiterCallAcknowledge = () => {
    setShowWaiterCallPopup(false);
    setWaiterCallData(null);
  };

  const handleWaiterCallDismiss = () => {
    setShowWaiterCallPopup(false);
    setWaiterCallData(null);
  };

  if (userName) {
    console.log(`Welcome to the console ${userName}!`);
  }
  console.log(localStorage.getItem("token"));

  return (
    <AdminGridContainer>
      <Nav setSelectedSection={handleSectionChange} selectedSection={selectedSection} />
      {selectedSection === "order" && <Order />}
      {selectedSection === "qr-pin" && <QRPin />}
      {selectedSection === "staff-page" && <StaffPage />}
      {selectedSection === "bill-out" && <BillOut />}
      {selectedSection === "menu-options" && <MenuOptions />}

      {showCustomerBillPopup && customerBillData && (
        <BillOutCustomerPopup
          cartItems={customerBillData.cartItems}
          totalPrice={customerBillData.totalPrice}
          orderNumber={customerBillData.orderNumber}
          selectedLanguage={"en" as LanguageCode}
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}

      {showWaiterCallPopup && waiterCallData && (
        <WaiterCallPopup
          isOpen={true}
          tableId={waiterCallData.tableId}
          orders={waiterCallData.orders}
          onAcknowledge={handleWaiterCallAcknowledge}
          onDismiss={handleWaiterCallDismiss}
        />
      )}
    </AdminGridContainer>
  );
};

export default AdminPage;

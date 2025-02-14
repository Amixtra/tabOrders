import { useEffect, useState, useRef } from "react";
import {
  OrderContainer,
  OrderHeader,
  HeaderItem,
  TabsContainer,
  Tab,
  TableContainer,
  TableHeader,
  TableHeaderItem,
  TableRow,
  TableCell,
  TableNumberCell,
  ConfirmedCell,
  TimeTableCell,
} from "./Order.style";
import { BackgroundOverlay } from "components/Cart/CartPop.styles";
import { AdminOrderPopup } from "components/Cart/Cart";
import axios from "axios";

type Order = {
  orderNumber: string;
  userID: string;
  orderType: string;
  tableNumber: number;
  createdAt: string;
  confirmStatus: string;
  totalPrice: number;
  items: any[];
};

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

const Order = () => {
  const [activeTab, setActiveTab] = useState<"unpaid" | "paid">("unpaid");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  const ordersRef = useRef<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const userData = getTokenData();

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://43.200.251.48:8080/api/orders", {
        params: { userID: userData?.userId },
      });

      const newOrders = response.data;
      setOrders(newOrders);
      ordersRef.current = newOrders;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      fetchOrders();
    }
  }, [userData]);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const formatOrderTime = (isoString: string) => {
    if (!isoString) return "N/A";

    const date = new Date(isoString);
    date.setHours(date.getHours() + 8);

    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleConfirm = async () => {
    setIsPopupOpen(false);
    try {
      await axios.patch("http://43.200.251.48:8080/api/orders/confirm", {
        orderNumber: selectedOrder?.orderNumber,
        userID: userData?.userId,
      });

      const updatedOrders = orders.map((o) =>
        o.orderNumber === selectedOrder.orderNumber
          ? { ...o, confirmStatus: "Confirmed" }
          : o
      );

      setOrders(updatedOrders);
      ordersRef.current = updatedOrders;

      if (!updatedOrders.some(o => o.confirmStatus !== "Confirmed")) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const sortedOrders = [
    ...orders.filter((o: Order) => o.confirmStatus !== "Confirmed"),
    ...orders.filter((o: Order) => o.confirmStatus === "Confirmed")
  ];  

  return (
    <>
      {isPopupOpen && (
        <>
          <BackgroundOverlay onClick={handleCancel} />
          <AdminOrderPopup
            orderNumber={selectedOrder?.orderNumber}
            cartItems={selectedOrder?.items || []}
            totalPrice={selectedOrder?.totalPrice ? selectedOrder.totalPrice.toString() : "0.00"}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            selectedLanguage="en"
          />
        </>
      )}
      <OrderContainer>
        <OrderHeader>
          <HeaderItem>{userData.username}</HeaderItem>
          <HeaderItem>{userData.company}</HeaderItem>
          <HeaderItem>Total Orders {orders.length}</HeaderItem>
        </OrderHeader>
        <TabsContainer>
          <Tab active={activeTab === "unpaid"} onClick={() => setActiveTab("unpaid")}>Orders</Tab>
          <Tab active={activeTab === "paid"} onClick={() => setActiveTab("paid")}>Paid</Tab>
        </TabsContainer>

        <TableContainer>
          <TableHeader>
            <TableHeaderItem>{activeTab === "paid" ? "Payment Method" : "Order Type"}</TableHeaderItem>
            <TableHeaderItem>Table No.</TableHeaderItem>
            <TableHeaderItem>{activeTab === "paid" ? "Paid Time" : "Order Time" }</TableHeaderItem>
            <TableHeaderItem>Status</TableHeaderItem>
          </TableHeader>

          {sortedOrders.map((order, index) => (
            <TableRow key={index} onClick={() => handleRowClick(order)}>
              <TableCell>{order.orderType || "N/A"}</TableCell>
              <TableNumberCell>{order.tableNumber || 0}</TableNumberCell>
              <TimeTableCell>{formatOrderTime(order.createdAt)}</TimeTableCell>
              <ConfirmedCell style={{ backgroundColor: order.confirmStatus === "Confirmed" ? "green" : "red" }}>
                {order.confirmStatus || "N/A"}
              </ConfirmedCell>
            </TableRow>
          ))}
        </TableContainer>
      </OrderContainer>
    </>
  );
};

export default Order;

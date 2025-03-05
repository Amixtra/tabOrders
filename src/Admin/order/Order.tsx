import { useEffect, useState, useCallback } from "react";
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

type OrderType = {
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
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const Order = () => {
  const [activeTab, setActiveTab] = useState<"unpaid" | "paid">("unpaid");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const userData = getTokenData();

  const fetchOrders = useCallback(async () => {
    try {
      if (!userData?.userId) return;
      const response = await axios.get("http://43.200.251.48:8080/api/orders", {
        params: { userID: userData.userId },
      });
      setOrders(response.data);
    } catch {}
  }, [userData]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatOrderTime = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    date.setHours(date.getHours() + 8);
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  const handleRowClick = (order: OrderType) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleConfirm = async () => {
    setIsPopupOpen(false);
    if (!selectedOrder) return;
    if (selectedOrder.confirmStatus === "Confirmed") return;
    try {
      await axios.patch("http://43.200.251.48:8080/api/orders/confirm", {
        orderNumber: selectedOrder.orderNumber,
        userID: userData?.userId,
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.orderNumber === selectedOrder.orderNumber
            ? { ...o, confirmStatus: "Confirmed" }
            : o
        )
      );
    } catch {}
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const sortedOrders = [
    ...orders.filter((o) => o.confirmStatus !== "Confirmed"),
    ...orders.filter((o) => o.confirmStatus === "Confirmed"),
  ];

  return (
    <>
      {isPopupOpen && selectedOrder && (
        <>
          <BackgroundOverlay onClick={handleCancel} />
          <AdminOrderPopup
            orderNumber={selectedOrder.orderNumber}
            cartItems={selectedOrder.items || []}
            totalPrice={selectedOrder.totalPrice ? selectedOrder.totalPrice.toString() : "0.00"}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            selectedLanguage="en"
          />
        </>
      )}
      <OrderContainer>
        <OrderHeader>
          <HeaderItem>{userData?.username}</HeaderItem>
          <HeaderItem>{userData?.company}</HeaderItem>
          <HeaderItem>Total Orders {orders.length}</HeaderItem>
        </OrderHeader>
        <TabsContainer>
          <Tab active={activeTab === "unpaid"} onClick={() => setActiveTab("unpaid")}>
            Orders
          </Tab>
          <Tab active={activeTab === "paid"} onClick={() => setActiveTab("paid")}>
            Archived Orders
          </Tab>
        </TabsContainer>
        <TableContainer>
          <TableHeader>
            <TableHeaderItem>
              {activeTab === "paid" ? "Payment Method" : "Order Type"}
            </TableHeaderItem>
            <TableHeaderItem>Table No.</TableHeaderItem>
            <TableHeaderItem>
              {activeTab === "paid" ? "Paid Time" : "Order Time"}
            </TableHeaderItem>
            <TableHeaderItem>Status</TableHeaderItem>
          </TableHeader>
          {sortedOrders.map((order, index) => (
            <TableRow key={index} onClick={() => handleRowClick(order)}>
              <TableCell>{order.orderType || "N/A"}</TableCell>
              <TableNumberCell>{order.tableNumber || 0}</TableNumberCell>
              <TimeTableCell>{formatOrderTime(order.createdAt)}</TimeTableCell>
              <ConfirmedCell
                style={{
                  backgroundColor: order.confirmStatus === "Confirmed" ? "green" : "red",
                }}
              >
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

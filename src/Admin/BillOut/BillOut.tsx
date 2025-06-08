import { useEffect, useState } from "react";
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
  TimeTableCell,
} from "./BillOut.style";
import { BackgroundOverlay } from "components/Cart/CartPop.styles";
import { BillOutOrderPopup, BillOutPaidPopup } from "components/Cart/Cart";
import BillOutPopUp from "./BillOutPopup/BillOutPopup";
import axios from "axios";

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

type GroupedPaidOrder = {
  orderNumber: number;
  tableNumber: number;
  allOrders: Order[];
  paidTime: string;
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

const fetchAllTables = async (userID: string): Promise<Order[]> => {
  try {
    const response = await axios.get(
      "https://tab-order-server.vercel.app/api/orders/bills-of-table",
      { params: { userID } }
    );
    const confirmedOrders = response.data.filter(
      (o: Order) => o.confirmStatus === "Confirmed"
    );
    return confirmedOrders.sort((a: Order, b: Order) => a.tableNumber - b.tableNumber);
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};

const fetchPaidData = async (userID: string): Promise<Order[]> => {
  try {
    const response = await axios.get("https://tab-order-server.vercel.app/api/orders/pay", { params: { userID } });
    return response.data.sort((a: Order, b: Order) => a.tableNumber - b.tableNumber);
  } catch (error) {
    console.error("Error fetching paid data:", error);
    return [];
  }
};

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

const groupPaidOrders = (orders: Order[]): GroupedPaidOrder[] => {
  const map: Record<string, GroupedPaidOrder> = {};

  for (const o of orders) {
    const rawPaidTime = o.paidAt ? o.paidAt : o.createdAt;
    const dateObj = new Date(rawPaidTime);
    dateObj.setMilliseconds(0);
    const truncatedPaidTime = dateObj.toISOString();
    const key = `${o.tableNumber}-${truncatedPaidTime}`;
    if (!map[key]) {
      map[key] = {
        orderNumber: o.orderNumber,
        tableNumber: o.tableNumber,
        allOrders: [o],
        paidTime: truncatedPaidTime,
      };
    } else {
      map[key].allOrders.push(o);
    }
  }
  return Object.values(map).sort(
    (a, b) => new Date(b.paidTime).getTime() - new Date(a.paidTime).getTime()
  );
};

const BillOut = () => {
  const [activeTab, setActiveTab] = useState<"table" | "paid">("table");
  const [tableData, setTableData] = useState<GroupedTable[]>([]);
  const [paidData, setPaidData] = useState<GroupedPaidOrder[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupedTable | GroupedPaidOrder | null>(null);
  const [isBillOutPopUpOpen, setIsBillOutPopUpOpen] = useState(false);

  const userData = getTokenData();

  const formatOrderTime = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    date.setHours(date.getHours() + 8);
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  useEffect(() => {
    if (userData?.userId) {
      const refreshData = () => {
        fetchAllTables(userData.userId).then((orders) => {
          setTableData(groupByTable(orders));
        });
        fetchPaidData(userData.userId).then((orders) => {
          setPaidData(groupPaidOrders(orders));
        });
      };

      refreshData();

      const intervalId = setInterval(refreshData, 5000);
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          refreshData();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearInterval(intervalId);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [userData]);

  const handleConfirm = () => {
    setIsPopupOpen(false);
    setIsBillOutPopUpOpen(true);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleRowClick = (group: GroupedTable | GroupedPaidOrder) => {
    setSelectedGroup(group);
    setIsPopupOpen(true);
  };

  const handleTabChange = (tab: "table" | "paid") => {
    setActiveTab(tab);
    setSelectedGroup(null);
    setIsPopupOpen(false);
  };

  const displayedTables = activeTab === "paid" ? paidData : tableData;

  return (
    <>
      {isPopupOpen && selectedGroup && (
        <>
          <BackgroundOverlay onClick={handleCancel} />
          {activeTab === "paid" ? (
            <BillOutPaidPopup
              orderNumber={`Table-${(selectedGroup as GroupedPaidOrder).tableNumber}`}
              cartItems={(selectedGroup as GroupedPaidOrder).allOrders.flatMap((o) => o.items)}
              totalPrice={String(
                (selectedGroup as GroupedPaidOrder).allOrders.reduce((sum, o) => sum + o.totalPrice, 0)
              )}
              onConfirm={() => {}}
              onCancel={handleCancel}
              selectedLanguage="en"
            />
          ) : (
            <BillOutOrderPopup
              orderNumber={`Table-${(selectedGroup as GroupedTable).tableNumber}`}
              cartItems={(selectedGroup as GroupedTable).allOrders.flatMap((o) => o.items)}
              totalPrice={String(
                (selectedGroup as GroupedTable).allOrders.reduce((sum, o) => sum + o.totalPrice, 0)
              )}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              selectedLanguage="en"
            />
          )}
        </>
      )}

      {isBillOutPopUpOpen && selectedGroup && userData && (
        <BillOutPopUp
          isOpen={isBillOutPopUpOpen}
          onClose={() => setIsBillOutPopUpOpen(false)}
          userID={userData.userId}
          tableNumber={
            activeTab === "paid"
              ? (selectedGroup as GroupedPaidOrder).tableNumber
              : (selectedGroup as GroupedTable).tableNumber
          }
        />
      )}

      <OrderContainer>
        <OrderHeader>
          <HeaderItem>{userData?.username || "No User"}</HeaderItem>
          <HeaderItem>{userData?.company || "No Company"}</HeaderItem>
          <HeaderItem>
            Total {activeTab === "paid" ? "Paid Orders" : "Tables"}:{" "}
            {activeTab === "paid" ? paidData.length : tableData.length}
          </HeaderItem>
        </OrderHeader>

        <TabsContainer>
          <Tab active={activeTab === "table"} onClick={() => handleTabChange("table")}>
            Table
          </Tab>
          <Tab active={activeTab === "paid"} onClick={() => handleTabChange("paid")}>
            Paid
          </Tab>
        </TabsContainer>

        <TableContainer>
          <TableHeader>
            {activeTab === "paid" ? (
              <>
                <TableHeaderItem>Payment Method</TableHeaderItem>
                <TableHeaderItem>Table No.</TableHeaderItem>
                <TableHeaderItem>Paid Time</TableHeaderItem>
              </>
            ) : (
              <>
                <TableHeaderItem>Table No.</TableHeaderItem>
                <TableHeaderItem>Last Order Time</TableHeaderItem>
              </>
            )}
          </TableHeader>

          {displayedTables.map((group, idx) =>
            activeTab === "paid" ? (
              <TableRow key={idx} onClick={() => handleRowClick(group)}>
                <TableCell>{(group as GroupedPaidOrder).allOrders[0]?.paymentType}</TableCell>
                <TableNumberCell>{(group as GroupedPaidOrder).tableNumber}</TableNumberCell>
                <TimeTableCell>{formatOrderTime((group as GroupedPaidOrder).paidTime)}</TimeTableCell>
              </TableRow>
            ) : (
              <TableRow key={idx} onClick={() => handleRowClick(group)}>
                <TableNumberCell>{(group as GroupedTable).tableNumber}</TableNumberCell>
                <TimeTableCell>{formatOrderTime((group as GroupedTable).lastOrderTime)}</TimeTableCell>
              </TableRow>
            )
          )}
        </TableContainer>
      </OrderContainer>
    </>
  );
};

export default BillOut;
